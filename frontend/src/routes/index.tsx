import React from "react"
import { Switch } from "react-router-dom"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Chatroom from "../pages/Chatroom"
import NotFound from "../pages/NotFound"
import { PrivateRoute } from "./PrivateRoute"
import { OpenRoute } from "./OpenRoute"
import Loading from "../components/loading"
import message from "../components/Message/Message"

const Routes = (props:any)=>{
    return (
        props.isLoading ? (
            <Loading />
        ) : (
        <Switch>
            <PrivateRoute path="/" exact={true} component={Chatroom} />
            <PrivateRoute path="/channel/:channelId" exact={true} component={Chatroom} />
            <PrivateRoute path="/Pm/:PmId" exact={true} component={Chatroom} />
            <OpenRoute path="/login"  component={Login} />
            <OpenRoute path="/register" component={Register} />
            <OpenRoute path="*" component={NotFound} />
        </Switch>
    )
    )}
    

export default Routes