import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    if(await knex.schema.hasTable("channel_messages")){
        return;
    }
    await knex.schema.createTable("channel_messages", (table)=>{
        table.increments();
        table.text("content");
        table.integer('channel_id').unsigned();
        table.foreign('channel_id').references("channels.id");
        table.integer("sender_id").unsigned();
        table.foreign("sender_id").references("users.id");
        table.integer("receiver_id").unsigned();
        table.foreign("receiver_id").references("users.id");
        table.text("message_picture")
        table.timestamp('datetime').notNullable().defaultTo(knex.fn.now());
        table.boolean("isPm").defaultTo("false")
        
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("channel_messages");
}

