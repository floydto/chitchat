import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    if(await knex.schema.hasTable("starred_channels")){
        return;
    }
    await knex.schema.createTable("starred_channels", (table)=>{
        table.increments();
        table.integer("user_id").unsigned().notNullable().unique;
        table.foreign("user_id").references("users.id");
        table.integer("channel_id").unsigned().notNullable().unique;
        table.foreign("channel_id").references("channels.id");
        table.boolean("starredOrNot")
            .notNullable()
            .defaultTo(true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("starred_channels");
}

