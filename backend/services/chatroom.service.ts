import Knex from "knex";

class ChatroomService {
    constructor(private knex: Knex) { }

    //starred sidebar
    fetchstarredChannelData = async (userId: number) => {
        const IsStarred = await this.knex("starred_channels")
            .select(["channels.id", "name", "description", "username", "profile_picture", "starredOrNot"])
            .join("channels",
                "channels.id",
                "channel_id")
            .join("users",
                "users.id",
                "user_id")
            .where("starred_channels.user_id", userId)
            .where("starredOrNot", true)
        return IsStarred;
    }


    isStarredChannelData = async (userId: number, channel_id: number) => {
        await this.knex.raw(
            `UPDATE "starred_channels" SET "starredOrNot" = NOT "starredOrNot" WHERE "user_id" = ? AND "channel_id" = ?`, [userId, channel_id])
        const IsStarred = await this.knex("starred_channels")
            .select("starredOrNot")
            .returning("starredOrNot")
            .where("channel_id", channel_id)
            .where("user_id", userId)
        return IsStarred;
    }

    //channel sidebar
    channelSidebarData = async (userId: number) => {
        const channelSidebar = await this.knex("channels")
            .select(["channels.id", "name", "description", "username", "profile_picture"])
            .join("channel_member_subTable",
                "channels_id",
                "channels.id")
            .join("users",
                "users.id",
                "created_by_id")
            .where('members_id', userId)
            .orderBy("channels.id")
        return channelSidebar;
    }

    addChannelData = async (name: string, description: string, userId: number | undefined) => {
        let addchannelsidebar: Array<any> = await this.knex("channels")
            .insert(
                {
                    name: name,
                    description: description,
                    created_by_id: userId
                })
            .into("channels")
            .returning(["id", "created_by_id"])
        await this.knex
            .select(["members_id", "channels_id"])
            .join("channel_member_subTable",
                "channels_id",
                "channels.id")
            .join("users",
                "members_id",
                "users.id")
            .insert(
                {
                    channels_id: addchannelsidebar[0].id,
                    members_id: addchannelsidebar[0].created_by_id,
                })
            .into("channel_member_subTable")
        await this.knex
            .insert(
                {
                    channel_id: addchannelsidebar[0].id,
                    starredOrNot: false,
                    user_id: addchannelsidebar[0].created_by_id
                })
            .into("starred_channels")
        return addchannelsidebar
    }
    //pm sidebar
    pmSidebarData = async (id: number) => {
        const pmsidebar = await this.knex("users").select(["*"]);
        return pmsidebar
    }


    //Channel Message
    fetchChannelMessagesData = async (id: number, channel_id: number) => {
        const ChannelMessages = await this.knex("channel_messages")
            .select(["*"])
            .leftJoin("users", "users.id", "channel_messages.sender_id")
            .where("channel_id", channel_id)
            .orderBy('channel_messages.id', 'asc')
        return ChannelMessages
    }


    isStarredStateData = async (id: number) => {
        const IsStarred = await this.knex("starred_channels")
            .select(["channels.id", "name", "description", "username", "profile_picture", "starredOrNot"])
            .join("channels",
                "channels.id",
                "channel_id")
            .join("users",
                "users.id",
                "user_id")
            .where("user_id", id)
        return IsStarred;
    }

    //Private Message
    fetchPrivateMessagesData = async (myUserId: number, userId: number) => {
        const ChannelMessages = await this.knex("private_messages")
            .select(["*"])
            .leftJoin("users", "users.id", "private_messages.sender_id")
            .where("sender_id", userId)
            .andWhere("receiver_id", myUserId)
            .orWhere("sender_id", myUserId)
            .andWhere("receiver_id", userId)
            .orderBy('private_messages.id', 'asc')




        return ChannelMessages
    }

    //MetaPanel(channel only) fetch data
    metalPanelData = async (id: number) => {
        const sidebar = await this.knex("channels").select(["name", "description", "created_by_id"]).where("id", id)
        return sidebar
    }


    //Send message function
    sendMessageData = async (isPm: boolean, sender_id: number, channel_id: number, content: string) => {
        if (isPm == false) {
            await this.knex
                .insert({
                    sender_id: sender_id,
                    channel_id: channel_id,
                    content: content
                })
                .into("channel_messages")
        } else {
            await this.knex
                .insert({
                    sender_id: sender_id,
                    receiver_id: channel_id,
                    content: content
                })
                .into("private_messages")
        }
    }

    SendImageData = async (isPm: any, sender_id: number, channel_id: number, message_picture: string|undefined) => {        
        if (isPm !== "0") {
            await this.knex
                .insert({
                    sender_id: sender_id,
                    channel_id: channel_id,
                    message_picture: message_picture
                })
                .into("channel_messages")
        } else {
            await this.knex
                .insert({
                    sender_id: sender_id,
                    receiver_id: channel_id,
                    message_picture: message_picture
                })
                .into("private_messages")
        }
    }


}



export default ChatroomService;