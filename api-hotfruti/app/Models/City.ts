import { DateTime } from "luxon";
import {
  BaseModel,
  HasOne,
  ManyToMany,
  column,
  hasOne,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import State from "./State";
import Establishment from "./Establishment";

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public state_id: number;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //uma cidade tem um estado
  @hasOne(() => State, {
    foreignKey: "id",
    localKey: "state_id",
  })
  public state: HasOne<typeof State>;

  @manyToMany(() => Establishment, {
    pivotTable: "cities_establishments",
    localKey: "id",
    pivotForeignKey: "city_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "establishment_id",
  })
  public establishment: ManyToMany<typeof Establishment>;
}
