import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("channel_member_subTable")) {
        return;
    } await knex.schema.createTable("channel_member_subTable", (table) => {
            table.increments();
            table.integer("channels_id").unsigned();
            table.foreign("channels_id").references("channels.id");
            table.integer("members_id").unsigned();
            table.foreign("members_id").references("users.id");
        }
        )
    }


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("channel_member_subTable");
}