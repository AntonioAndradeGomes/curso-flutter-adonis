import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'cliente@gmail.com',
      password: '123456',
      type: 'client',
    });
    await Client.create({
      name: 'Cliente 1',
      phone: '82 999738774',
      userId: user.id,
    });
  }
}
