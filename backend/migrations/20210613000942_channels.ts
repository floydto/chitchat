import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    if(await knex.schema.hasTable("channels")){
        return;
    }
    await knex.schema.createTable("channels", (table)=>{
        table.increments();
        table.text("name").notNullable();
        table.text("description");
        table.integer("created_by_id").unsigned();
        table.foreign("created_by_id").references("users.id");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("channels");
}

