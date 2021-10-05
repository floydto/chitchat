import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    if(await knex.schema.hasTable("private_messages")){
        return;
    }
    await knex.schema.createTable("private_messages", (table)=>{
        table.increments();
        table.text("content")
        table.integer("sender_id").unsigned();
        table.foreign("sender_id").references("users.id");
        table.integer("receiver_id").unsigned();
        table.foreign("receiver_id").references("users.id");
        table.text("message_picture")
        table.boolean("isPm").defaultTo(true);
        table.timestamp('datetime').notNullable().defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("private_messages");
}

