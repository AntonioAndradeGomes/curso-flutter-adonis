import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Admin from "App/Models/Admin";
import Client from "App/Models/Client";
import Establishment from "App/Models/Establishment";
import User from "App/Models/User";

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      const user = await User.findByOrFail("email", email);
      let expires;
      switch (user.type) {
        case "client":
          expires = "30days";
          break;
        case "establishment":
          expires = "7days";
          break;
        case "admin":
          expires = "1day";
          break;
        default:
          expires = "30days";
          break;
      }
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: expires,
        name: user.serialize().email,
      });
      response.ok({ token, user });
    } catch {
      return response.badRequest({
        message: "Invalid credentials",
      });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
      return response.ok({
        revoked: true,
      });
    } catch {
      return response.unauthorized({ message: "Not authorized for this" });
    }
  }

  public async me({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    let data: any;

    switch (userAuth.type) {
      case "client":
        const client = await Client.findByOrFail("userId", userAuth.id);
        data = {
          id_client: client.id,
          name: client.name,
          phone: client.phone,
          email: userAuth.email,
        };
        break;
      case "establishment":
        const establishment = await Establishment.findByOrFail(
          "userId",
          userAuth.id
        );
        data = {
          id_establishment: establishment.id,
          name: establishment.name,
          logo: establishment.logo,
          online: establishment.online,
          itsBlocked: establishment.itsBlocked,
          email: userAuth.email,
        };
        break;
      case "admin":
        const admin = await Admin.findByOrFail("userId", userAuth.id);
        data = {
          id_admin: admin.id,
          name: admin.name,
          email: userAuth.email,
        };
        break;
      default:
        return response.unauthorized({
          message: "Unauthorized user - type not found",
        });
    }

    return response.ok({ user: data });
  }
}
