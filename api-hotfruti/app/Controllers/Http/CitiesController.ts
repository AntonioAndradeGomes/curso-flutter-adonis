import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import City from "App/Models/City";

export default class CitiesController {
  public async index({ response }: HttpContextContract) {
    const cidades = await City.query()
      .whereHas("establishment", (query) => {
        query.where("itsBlocked", false);
      })
      .preload("state");

    return response.ok(cidades);
  }

  public async establishments({ params, response }: HttpContextContract) {
    const cidade = await City.query()
      .where("id", params.id)
      .preload("establishment")
      .firstOrFail();
    return response.ok(cidade.establishment);
  }
}
