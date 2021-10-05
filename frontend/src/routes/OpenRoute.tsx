import { useSelector } from "react-redux";
import { RouteProps, Redirect, Route } from "react-router-dom";
import { IRootState } from "../redux/store";
import React from "react";

export function OpenRoute({ component, ...rest }: RouteProps){
    const isAuthenticated = useSelector((state:IRootState)=>state.auth.isAuthenticated);
    const Component = component;
    if (!Component) {
        return null;
    }
    let render:(props:any)=>JSX.Element 
    if(!isAuthenticated){
        render = (props:any)=>(
            <Component {...props} />
        )    
    }else{
        render = (props:any)=>(
            <Redirect to={ {
                pathname: '/',
                state: { from: props.location }
            } } />
        )
    }
    return <Route {...rest} render={render}/>    
};