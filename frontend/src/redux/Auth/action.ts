export const LOGIN = "@@AUTH/LOGIN"
export const LOGIN_FAILED = "@@AUTH/LOGIN_FAILED"
export const LOGIN_PROCESS = "@@AUTH/LOGIN_PROCESS"
export const LOGOUT = "@@AUTH/LOGOUT"
export const USER_INFO = "@@AUTH/USER_INFO"

export const login = () => {
    return {
		type: LOGIN as typeof LOGIN,
    }
}

export const loginFailed = (errors:string) => {
    return {
        type: LOGIN_FAILED as typeof LOGIN_FAILED,
        errors
    }
}

export const loginProcess = ()=>{
    return{
        type: LOGIN_PROCESS as typeof LOGIN_PROCESS,
    }
}

export const logout = () =>{
    return {
        type: LOGOUT as typeof LOGOUT
    }
}

export const UserInfo = (
	created_at: string | null, 
	id: number | null,
	profile_picture: string | null,
	username: string | null,
	) => {
	return {
		type: USER_INFO as typeof USER_INFO,
		payload: {
			created_at, 
			id,
			profile_picture,
			username,
		}
	}
}

type actionCreators = typeof login | typeof loginFailed | typeof logout | typeof loginProcess | typeof UserInfo


export type IAuthActions = ReturnType<actionCreators>
