import { ThunkDispatch } from "../store"
import { loginFailed, login, logout, loginProcess } from './action';
import { push } from "connected-react-router";
import { UserInfo } from './action';

const {REACT_APP_API_SERVER} = process.env

export const loginThunk = (email:string, password:string)=>{
    return async (dispatch:ThunkDispatch) =>{
        dispatch(loginProcess())
        const res = await fetch(`${REACT_APP_API_SERVER}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
		})
		const result = await res.json()
        if(res.status === 200){
            console.log("login-success")
            localStorage.setItem("token", result.token)
			localStorage.setItem("payload", result.payload)
            const userInfo = JSON.parse(result.payload)
            dispatch(UserInfo(userInfo.created_at, userInfo.id, userInfo.profile_picture, userInfo.username))
            dispatch(login())
            dispatch(push("/"))
        }else{
            dispatch(loginFailed("Incorrect email or password input"))
        }
    }
}

export const logoutThunk = () => {
    return async (dispatch: ThunkDispatch) => {
        localStorage.removeItem("token")
        localStorage.removeItem("payload")
        dispatch(logout())
    }
}
