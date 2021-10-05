import { IAuthState } from "./state";
import { IAuthActions } from "./action";

const initialState: IAuthState = {
	isAuthenticated: localStorage.getItem("token") !==null,
	errors: "",
	isLoginProcessing: false,
	payload: {
		created_at: null,
		id: null,
		profile_picture: null,
		username: null,
	},
};

export const authReducer = (
	state: IAuthState = initialState,
	actions: IAuthActions
) => {
	switch (actions.type) {
		case "@@AUTH/LOGIN_PROCESS":
			return { ...state, isLoginProcessing: true };
		case "@@AUTH/LOGIN":
			return {
				...state,
				isAuthenticated: true,
				errors: "",
				isLoginProcessing: false,
			};
		case "@@AUTH/LOGIN_FAILED":
			return {
				...state,
				isAuthenticated: false,
				errors: actions.errors,
				isLoginProcessing: false,
			};
		case "@@AUTH/LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				errors: "",
			};
		case "@@AUTH/USER_INFO":
			return {
				...state,
				payload: actions.payload,
			};
		default:
			return state;
	}
};
