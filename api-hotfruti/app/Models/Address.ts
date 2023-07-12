import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: string;

  @column()
  public cityId: string;

  @column()
  public road: string;

  @column()
  public number: number | null;

  @column()
  public neighborhood: string;

  @column()
  public referencePoint : string | null;

  @column()
  public complement : string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
