import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("client_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clients");
      table
        .integer("city_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cities");
      table.string("road").notNullable(); //rua
      table.string("number").nullable();
      table.string("neighborhood").notNullable(); //bairro
      table.string("reference_point").nullable();
      table.string("complement").nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
