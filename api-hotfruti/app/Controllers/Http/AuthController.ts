import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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
}
