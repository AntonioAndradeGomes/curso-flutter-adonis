import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Establishment from 'App/Models/Establishment';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: "estabelecimento@gmail.com",
      password: "123456",
      type: "establishment",
    });
     await Establishment.create({
      name: "Estabelecimento webevolui",
      logo: "https://webevolui.com.br/principal/images/web-evolui-logo.png",
      online: true,
      itsBlocked: false,
      userId: user.id,
    })
  }
}
