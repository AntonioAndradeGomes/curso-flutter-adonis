import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Client from "App/Models/Client";
import User from "App/Models/User";
import CreateClientValidator from "App/Validators/CreateClientValidator";
import EditClientValidator from "App/Validators/EditClientValidator";

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: "client",
    });

    const client = await Client.create({
      name: payload.name,
      phone: payload.phone,
      userId: user.id,
    });

    return response.created({
      id: client.id,
      name: client.name,
      email: user.email,
      phone: client.phone,
      type: user.type,
    });
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(EditClientValidator);
    const userAuth = await auth.use("api").authenticate();
    //trasação -> evitar erros de concorrencia, se der erro em alguma alteração, não fazer nada.
    const trx = await Database.transaction();

    try {
      const user = await User.findByOrFail("id", userAuth.id);
      const client = await Client.findByOrFail("user_id", user.id);

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        });
      } else {
        user.merge({
          email: payload.email,
        });
      }

      await user.save();
      client.merge({
        name: payload.name,
        phone: payload.phone,
      });
      await client.save();

      //insere no bd as informações
      await trx.commit();

      return response.ok({
        id: client.id,
        name: client.name,
        email: user.email,
        phone: client.phone,
        type: user.type,
      });
    } catch (error) {
      await trx.rollback();
      return response.badRequest({
        message: "Something in your request is incorrect!",
      });
    }
  }
}
