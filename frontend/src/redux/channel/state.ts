export interface IChannelState {
	currentChannel: {
		id: number,
		description: string|null,
		name: string,
		createdBy: {
			username: string|null,
			profile_picture: string|null
		}
	};
	isPrivateChannel: boolean;
	userPosts: {
		content: string,
		timestamp: any,
		user:{
			id:number,
			username: string,
			profile_picture: string
		}
	}
	primaryColor: string;
	secondaryColor: string;
}

