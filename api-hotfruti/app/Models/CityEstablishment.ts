import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CityEstablishment extends BaseModel {
  @column({ isPrimary: true })
  public city_id: number;

  @column({ isPrimary: true })
  public establishment_id: number;

  @column()
  public delivery_cost: number;
}
