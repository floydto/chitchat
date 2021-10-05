
import express from "express";
import ChatRoomController from "../controllers/chatroom.controller";
import {upload} from "../main"
import { isLoggedIn } from "../utils/guards"


export const ChatRoomRoute = (chatRoomController: ChatRoomController)=>{
    let chatRoomRoutes = express.Router();
    chatRoomRoutes.post("/channel-sidebar", isLoggedIn, chatRoomController.ChannelSidebar)
    chatRoomRoutes.post("/pm-sidebar", isLoggedIn, chatRoomController.PmSidebar)
    chatRoomRoutes.post("/add-channel", isLoggedIn, chatRoomController.Addchannel)
    chatRoomRoutes.post("/channel-message-info", isLoggedIn, chatRoomController.fetchChannelMessages)
    chatRoomRoutes.post("/private-message-info", isLoggedIn, chatRoomController.fetchPrivateMessages)
    chatRoomRoutes.post("/sendmessage", isLoggedIn, chatRoomController.SendMessage)
    chatRoomRoutes.post("/sendimage", isLoggedIn,upload.single("message_picture"),chatRoomController.SendImage)
    chatRoomRoutes.post("/fetchStarredChannel", isLoggedIn, chatRoomController.FetchStarredChannel)
    chatRoomRoutes.post("/isStarredChannel", isLoggedIn, chatRoomController.isStarredChannel)
    chatRoomRoutes.post("/isStarredState", isLoggedIn, chatRoomController.isStarredState)


    

    return chatRoomRoutes;
}
