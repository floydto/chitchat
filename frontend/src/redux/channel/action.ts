export const SET_CURRENT_CHANNEL = "@@CHANNEL/SET_CURRENT_CHANNEL"
export const SET_PRIVATE_CHANNEL = "@@CHANNEL/SET_PRIVATE_CHANNEL"
export const SET_USER_POSTS = "@@CHANNEL/SET_USER_POSTS"
export const SET_COLORS = "@@CHANNEL/SET_COLORS"


/* Channel Actions */
export const setCurrentChannel = (id: number, description: string|null, name: string, username: string|null, profile_picture: string|null) => {
	return {
		type: SET_CURRENT_CHANNEL as typeof SET_CURRENT_CHANNEL,
		payload: {
			id,
			description,
			name,
			createdBy: {
				username,
				profile_picture
			}
		}
	}
};

export const setPrivateChannel = (isPrivateChannel: any) => {
	return {
		type: SET_PRIVATE_CHANNEL as typeof SET_PRIVATE_CHANNEL,
		payload: {
			isPrivateChannel
		}
	};
};

export const setUserPosts = (content: string, timestamp: any, id: number, username: string, profile_picture: string) => {
	return {
		type: SET_USER_POSTS as typeof SET_USER_POSTS,
		payload: {
			content,
			timestamp,
			user: {
				id,
				username,
				profile_picture
			}
		}
	};
};


type actionCreators = typeof setCurrentChannel | typeof setPrivateChannel | typeof setUserPosts


export type IChannelActions = ReturnType<actionCreators>