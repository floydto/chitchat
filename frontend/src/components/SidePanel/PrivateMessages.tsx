import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Menu, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from '../../redux/store';
import { setCurrentChannel, setPrivateChannel } from "../../redux/channel/action"

const DirectMessages = (props: any) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  const [state, setState] = useState({
    activeChannel: "",
    user: currentUser,
    channel: {},
    users: [],
    modal: false
  });

  useEffect(() => {
    fetchPmSidebarDataJSON()
    return () => {
    }
  }, [])


  // create a fetch function
  const bearer: string = "Bearer " + localStorage.token;
  const { REACT_APP_API_SERVER } = process.env;
  const fetchPmSidebarDataJSON = async () => {
    const PmNameJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/pm-sidebar`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
    })

    if (PmNameJSON.status === 200) {
      let chatContent = await PmNameJSON.json()
      setState((e: any) => { return { ...e, users: chatContent } });
    }
  }


  const changeChannel = (user: any) => {
    const channelData = {
      id: user.id,
      name: user.username,
    };
    dispatch(setPrivateChannel(true))
    
    setState((e) => { return { ...e, activeChannel: user.id } });
    dispatch(setCurrentChannel(channelData.id,null, channelData.name, null, null))
    setState((e: any) => { return { ...e, channel: channelData } })
  };

  const displayUsers = (users: any) =>
    users.length > 0 &&
    users.map((user: any) => (
      <Menu.Item
        key={user.id}
        onClick={() => changeChannel(user)}
        name={user.username}
        style={{ opacity: 0.7, fontStyle: "italic" }}
        active={user.id === state.activeChannel}
      >
        @ {user.username}
      </Menu.Item>
    ));

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> INBOX
        </span>{" "}
        ({state.users.length})
      </Menu.Item>

      {displayUsers(state.users)}

    </Menu.Menu>
  );
}


export default DirectMessages

