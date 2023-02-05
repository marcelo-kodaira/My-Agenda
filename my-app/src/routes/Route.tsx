import { ComponentType } from "react";
import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props extends RouteProps{
    isPrivate?: boolean;
    component: ComponentType
}


export const Route = ({ isPrivate = false, component: Component, ...rest}: Props) =>{
    const {token} = useAuth()
    
    return (
    <ReactRoute
     {...rest}
      render={() =>
         isPrivate === !!token ? (
            <Component/> 
          ): (
            <Redirect to={isPrivate ? '/' : '/dashboard'} /> 
          )
      }
      />
    )
}


