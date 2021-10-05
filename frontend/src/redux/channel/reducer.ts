import { IChannelState } from "./state"
import { IChannelActions} from "./action";


const initialChannelState: IChannelState = {
	currentChannel:{
		id: 0,
		description:"",
		name: "",
		createdBy: {
			username:"",
			profile_picture: ""
		}
	},
	isPrivateChannel: false,
	userPosts: {
		content: "",
		timestamp: null,
		user:{
			id:0,
			username: "",
			profile_picture: ""
		}
	},
	primaryColor: "#4c3c4c",
	secondaryColor: "#eee"
};


export const channelReducer = (
	state: IChannelState = initialChannelState,
	actions: IChannelActions
) => {
	switch (actions.type) {
		case "@@CHANNEL/SET_CURRENT_CHANNEL":
			return { ...state,
				currentChannel: actions.payload };
		case "@@CHANNEL/SET_PRIVATE_CHANNEL":
			return {
				...state,
				isPrivateChannel: actions.payload.isPrivateChannel };
		case "@@CHANNEL/SET_USER_POSTS":
			return {
				...state,
				userPosts: actions.payload};
		default:
			return state;
	}
};
