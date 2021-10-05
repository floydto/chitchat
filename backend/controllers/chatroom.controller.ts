import ChatroomService from "../services/chatroom.service";
import { Request, Response } from 'express';

export default class ChatroomController {
    constructor(public ChatRoomService: ChatroomService) { }

    //starred sidebar
    ChannelSidebar = async (req: Request, res: Response) => {
        let sideBarData = await this.ChatRoomService.channelSidebarData(req.body.userId)
        res.json(sideBarData)
    }

    Addchannel = async (req: Request, res: Response) => {
        const { name, description, } = req.body;
        const userId = req.user?.id
        let addchannelsidebar = await this.ChatRoomService.addChannelData(name, description, userId)
        res.json(addchannelsidebar)
    }

    //channel sidebar

    FetchStarredChannel = async (req: Request, res: Response) => {
        let sideBarData = await this.ChatRoomService.fetchstarredChannelData(req.body.userId)
        res.json(sideBarData)
    }

    isStarredChannel = async (req: Request, res: Response) => {
        const { userId, channel_id } = req.body;
        let sideBarData = await this.ChatRoomService.isStarredChannelData(userId, channel_id)
        res.json(sideBarData)
    }

    //pm sidebar
    PmSidebar = async (req: Request, res: Response) => {
        let sideBarData = await this.ChatRoomService.pmSidebarData(req.body.userId);
        res.json(sideBarData)
    }

    // Message
    isStarredState = async (req: Request, res: Response) => {
        let sideBarData = await this.ChatRoomService.isStarredStateData(req.body.userId)
        res.json(sideBarData)
    }

    //Channel Message
    fetchChannelMessages = async (req: Request, res: Response) => {
        const { userId, channel_id } = req.body;
        const ChannelMessagesArr = await this.ChatRoomService.fetchChannelMessagesData(userId, channel_id)
        res.json(ChannelMessagesArr)
    }

    //Private Message
    fetchPrivateMessages = async (req: Request, res: Response) => {
        const { myUserId, userId } = req.body;
        const ChannelMessagesArr = await this.ChatRoomService.fetchPrivateMessagesData(myUserId, userId)
        res.json(ChannelMessagesArr)
    }

    //MetaPanel(channel only) fetch data
    MetalPanel = async (req: Request, res: Response) => {
        let sideBarData = await this.ChatRoomService.metalPanelData(req.body.userId);
        res.json(sideBarData)
    }

    //Send message function
    SendMessage = async (req: Request, res: Response) => {
        const { isPm, sender_id, channel_id, content} = req.body;
        let messageSent = await this.ChatRoomService.sendMessageData(isPm, sender_id, channel_id, content);
        return res.status(200).json({ messageSent })
    }

    SendImage = async (req: Request, res: Response) => {
        const { isPm, sender_id, channel_id} = req.body;
        const message_picture = req.file?.filename;
        await this.ChatRoomService.SendImageData(isPm, sender_id, channel_id, message_picture);
        return res.status(200).json({url:message_picture})
}
}