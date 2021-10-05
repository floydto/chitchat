import * as Knex from "knex";
import { hashPassword } from '../utils/hash'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("starred_channels").del();
    await knex("private_messages").del();
    await knex("channel_messages").del();
    await knex("channel_member_subTable").del();
    await knex("channels").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            "username": "Floyd",
            "password": await hashPassword("123456"),
            "email":"tosan21016@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/735b04eba3dd7bd4ace5ca28cb781fc1?d=identicon"
        },
        {
            id: 2,
            "username": "Jimmy",
            "password": await hashPassword("123456"),
            "email":"jimmy@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/00e3bb8fcadccccd91c842a666ed2565?d=identicon"
        },
        {
            id: 3,
            "username": "Peter",
            "password": await hashPassword("123456"),
            "email":"peter@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/325b573242e69ffcf8e70b95828f9ac1?d=identicon"
        },
        {
            id: 4,
            "username": "Shirley",
            "password": await hashPassword("123456"),
            "email":"shirley@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/00e3bb8fcadccccd91c842a666ed2565?d=identicon"
        },
        {
            id: 5,
            "username": "David",
            "password": await hashPassword("123456"),
            "email":"david@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/e43af6a00f69cc44461f6330aa7dc7a6?d=identicon"
        },
        {
            id: 6,
            "username": "Anna",
            "password": await hashPassword("123456"),
            "email":"Anna@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/9dc6793dcbf385dfcf1df70a8dda132d?d=identicon"
        },
        {
            id: 7,
            "username": "Jane",
            "password": await hashPassword("123456"),
            "email":"jane@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/620d230de4273fca27cd2bda7f24cecd?d=identicon"
        },
        {
            id: 8,
            "username": "Jessica",
            "password": await hashPassword("123456"),
            "email":"jessica@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/e785153308eca0740040a5c6e9cfe6d1?d=identicon"
        },
        {
            id: 9,
            "username": "Fiona",
            "password": await hashPassword("123456"),
            "email":"fiona@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/b028e9ca948dbc90143f598ad3c254b6?d=identicon"
        },
        {
            id: 10,
            "username": "Louis",
            "password": await hashPassword("123456"),
            "email":"louis@gmail.com",
            "profile_picture":"http://gravatar.com/avatar/f979e0fea3bfc2c82ce006a7966c782c?d=identicon"
        },
        
])

    await knex("channels").insert([
        {
            id: 1,
            "created_by_id": 6,
            "description": "俾新手同高手一齊討論既React討論區",
            "name": "React討論區"
        },
        {
            id: 2,
            "created_by_id": 4,
            "description": "一眾新手求人carry的小頻道",
            "name": "新手組隊",
        },
        {
            id: 3,
            "created_by_id": 1,
            "description": "軟件台",
            "name": "軟件開發及資訊",
        },
        {
            id: 4,
            "created_by_id": 2,
            "description": "荃灣區美食分享",
            "name": "飲飲食食",
        },
        {
            id: 5,
            "created_by_id": 4,
            "description": "十八區天氣預測",
            "name": "今日有冇落雨呢？",
        }]);

    await knex("channel_member_subTable").insert([
        {
            "channels_id": 1,
            "members_id": 1
        },
        {
            "channels_id": 1,
            "members_id": 6
        },
        {
            "channels_id": 1,
            "members_id": 2
        },
        {
            "channels_id": 1,
            "members_id": 4
        },
        {
            "channels_id": 2,
            "members_id": 1
        },
        {
            "channels_id": 3,
            "members_id": 3
        },
        {
            "channels_id": 3,
            "members_id": 1
        },
        {
            "channels_id": 1,
            "members_id": 5
        },
        {
            "channels_id": 3,
            "members_id": 7
        },
        {
            "channels_id": 3,
            "members_id": 8
        },
        {
            "channels_id": 3,
            "members_id": 9
        },
        {
            "channels_id": 2,
            "members_id": 2
        }, {
            "channels_id": 3,
            "members_id": 2
        }, {
            "channels_id": 4,
            "members_id": 1
        },
        {
            "channels_id": 5,
            "members_id": 2
        },
        {
            "channels_id": 5,
            "members_id": 1
        },
        {
            "channels_id": 5,
            "members_id": 3
        },
        {
            "channels_id": 5,
            "members_id": 4
        },
        {
            "channels_id": 5,
            "members_id": 5
        },
    ]);

    await knex("private_messages").insert([
        {
            "sender_id": 2,
            "receiver_id": 3,
            "content": "Hi, how are you?",
        },
        {
            "sender_id": 2,
            "receiver_id": 1,
            "content": "Hi, how are you?",
        },
        {
            "sender_id": 2,
            "receiver_id": 4,
            "content": "Hi, how are you?",
        },
        {
            "sender_id": 1,
            "receiver_id": 2,
            "content": "Hey Jimmy! Long Time No See",
        },
        {
            "sender_id": 2,
            "receiver_id": 3,
            "content": "nothing",
        },
        {
            "sender_id": 3,
            "receiver_id": 1,
            "content": "Hey Floyd, did you see my thing?",
            "datetime": "2021-06-11T13:00:13.459Z"
        },
        {
            "sender_id": 1,
            "receiver_id": 3,
            "content": "What?",
            "datetime": "2021-06-11T13:01:13.459Z"
        },
        {
            "sender_id": 3,
            "receiver_id": 1,
            "content": "my phone, in front my computer",
            "datetime": "2021-06-11T14:01:13.459Z"
        },
        {  
            "sender_id": 1,
            "receiver_id": 3,
            "content": "man, I didn't see nothing",
            "datetime": "2021-06-11T15:01:13.459Z"
        },
        {
            "sender_id": 6,
            "receiver_id": 1,
            "content": "Hi Floyd",
        },
        {
            "sender_id": 7,
            "receiver_id": 1,
            "content": "man, got something for you",
        },
        {
            "sender_id": 8,
            "receiver_id": 1,
            "content": "Floyd, let's have a drink",
        },
        {
            "sender_id": 9,
            "receiver_id": 1,
            "content": "Hey dude!",
        }



    ]);

    await knex("channel_messages").insert([
        {
            "sender_id": 6,
            "channel_id": 1,
            "content": "今日有個位卡左係到"
        },
        {
            "sender_id": 2,
            "channel_id": 1,
            "content": "邊到呀，睇睇先"
        },
        {
            "sender_id": 1,
            "channel_id": 1,
            "content": "show me your code"
        },
        {
            "sender_id": 4,
            "channel_id": 1,
            "content": "Hi everyone"
        },
        {
            "sender_id": 4,
            "channel_id": 2,
            "content": "Hi everyone"
        }, 
        {
            "sender_id": 4,
            "channel_id": 2,
            "content": "有冇新手係到"
        },
        {
            "sender_id": 5,
            "channel_id": 2,
            "content": "Hi, I am"
        },
        {
            "sender_id": 2,
            "channel_id": 4,
            "content": "testing"
        },
        {
            "sender_id": 5,
            "channel_id": 5,
            "content": "today weather so bad"
        },
        {
            "sender_id": 5,
            "channel_id": 4,
            "content": "Hey don't test here"
        },
        {
            "sender_id": 5,
            "channel_id": 4,
            "content": "Hey Hey My My"
        },
        {
            "sender_id": 7,
            "channel_id": 3,
            "content": "dude"
        },
        {
            "sender_id": 8,
            "channel_id": 4,
            "content": "check"
        },
        {
            "sender_id": 9,
            "channel_id": 5,
            "content": "har"
        },
        {
            "sender_id": 9,
            "channel_id": 3,
            "content": "test"
        },
        {
            "sender_id": 3,
            "channel_id": 3,
            "content": "test+1"
        },


    ]);
    await knex("starred_channels").insert([
        {
            "user_id": 1,
            "channel_id": 1,
            "starredOrNot": true
        }, {
            "user_id": 1,
            "channel_id": 2,
            "starredOrNot": false
        },
        {
            "user_id": 1,
            "channel_id": 3,
            "starredOrNot": true
        },
        {
            "user_id": 2,
            "channel_id": 1,
            "starredOrNot": true
        }, {
            "user_id": 1,
            "channel_id": 4,
            "starredOrNot": false
        }, {
            "user_id": 1,
            "channel_id": 5,
            "starredOrNot": true
        },
        {
            "user_id": 2,
            "channel_id": 2,
            "starredOrNot": true
        },
        {
            "user_id": 2,
            "channel_id": 3,
            "starredOrNot": true
        },
        {
            "user_id": 2,
            "channel_id": 4,
            "starredOrNot": true
        },
        {
            "user_id": 2,
            "channel_id": 5,
            "starredOrNot": true
        },
        {
            "user_id": 3,
            "channel_id": 1,
            "starredOrNot": true
        },
        {
            "user_id": 3,
            "channel_id": 2,
            "starredOrNot": true
        },
        {
            "user_id": 3,
            "channel_id": 3,
            "starredOrNot": true
        },
        {
            "user_id": 3,
            "channel_id": 4,
            "starredOrNot": true
        },
        {
            "user_id": 3,
            "channel_id": 5,
            "starredOrNot": true
        }
    ])
};

