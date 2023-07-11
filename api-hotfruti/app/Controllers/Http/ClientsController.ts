import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import User from 'App/Models/User';
import CreateClientValidator from 'App/Validators/CreateClientValidator'

export default class ClientsController {
  public async store({request, response} : HttpContextContract){
    const payload = await request.validate(CreateClientValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: 'client',
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
}