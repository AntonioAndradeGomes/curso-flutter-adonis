import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CityEstablishment extends BaseModel {
  @column({ isPrimary: true })
  public cityId: number;

  @column({ isPrimary: true })
  public establishmentId: number;

  @column()
  public deliveryCost: number;
}
