import React from 'react'
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel"
import Channels from "./Channels";
import PrivateMessages from "./PrivateMessages";
import Starred from "./Starred";
import "../../css/Chatroom.css"
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { Scrollbars } from 'react-custom-scrollbars';

const SidePanel=(props:any)=>{
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: props.primaryColor, fontSize: "1.2rem" }}
    >
    <Scrollbars autoHide >
      <UserPanel primaryColor={props.primaryColor} currentUser={currentUser} />
      <Starred currentUser={currentUser}/>
      <Channels currentUser={currentUser} />
      <PrivateMessages currentUser={currentUser}/>
      </Scrollbars>
      
    </Menu>
  );
}

export default SidePanel
