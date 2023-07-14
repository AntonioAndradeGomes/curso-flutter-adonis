import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Establishment from "App/Models/Establishment";
import User from "App/Models/User";
import { faker } from "@faker-js/faker";
import State from "App/Models/State";
import City from "App/Models/City";
import CityEstablishment from "App/Models/CityEstablishment";

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: "estabelecimentowebevolui@gmail.com",
      password: "123456789",
      type: "establishment",
    });
    await Establishment.create({
      name: "Estabelecimento webevolui",
      logo: "https://webevolui.com.br/principal/images/web-evolui-logo.png",
      online: true,
      itsBlocked: false,
      userId: user.id,
    });
    for (let i = 2; i <= 20; i++) {
      await User.create({
        email: `estabelecimento${i}@gmail.com`,
        password: "123456789",
        type: "establishment",
      });
    }
    for (let i = 2; i <= 20; i++) {
      await Establishment.create({
        name: `Estabelecimento ${i}`,
        logo: `https://picsum.photos/id/${i}/200/200`,
        online: true,
        itsBlocked: false,
        userId: i,
      });
    }
    await State.createMany([
      {
        name: "Alagoas",
        uf: "AL",
      },
      {
        name: "Sergipe",
        uf: "SE",
      },
    ]);

    await City.createMany([
      {
        name: "Maceió",
        state_id: 1,
      },
      {
        name: "Arapiraca",
        state_id: 1,
      },
    ]);

    await City.createMany([
      {
        name: "Aracajú",
        state_id: 2,
      },
      {
        name: "Itabaiana",
        state_id: 2,
      },
    ]);

   for (let i = 1; i <= 20; i++) {
      await CityEstablishment.create({
        city_id: faker.number.int({ min: 1, max: 2 }),
        establishment_id: i,
        delivery_cost: faker.number.float({
          min: 0,
          max: 3,
          precision: 0.5,
        }),
      });
    }
  }
}
