import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  //estabelecimentos
  protected tableName = "establishments";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("name",255).notNullable();
      table.string("logo", 255).nullable();
      table.boolean("its_blocked").notNullable().defaultTo(false);
      table.boolean("online").notNullable().defaultTo(false);
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
