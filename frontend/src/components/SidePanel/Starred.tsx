import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Menu, Icon } from "semantic-ui-react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from "../../redux/channel/action"


const Starred = (props: any) => {
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    channel: currentChannel,
    user: currentUser,
    activeChannel: "",
    starredChannels: []
  });

  useEffect(() => {
    fetchStarredChannelDataJSON()
    return () => {
    }
  }, [state.starredChannels])


  const bearer: string = "Bearer " + localStorage.token;
  const { REACT_APP_API_SERVER } = process.env;

  // fetch channel name
  const fetchStarredChannelDataJSON = async () => {
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/fetchStarredChannel`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: currentUser.id })
    })
    if (responseJSON.status === 200) {
      const rawResponse = await responseJSON.json();
      const response = rawResponse.map((e: any) => { return { id: e.id, description:e.description, name: e.name, username: e.username, profile_picture: e.profile_picture } })
      if (response !== undefined) {
        setState((e: any) => { return { ...e, starredChannels: response } })
        setActiveChannel(state.channel)
      }
    }
  }
  

  const setActiveChannel = (channel: { id: any; }) => {
    setState((e) => { return { ...e, activeChannel: channel.id } });
  };

  const changeChannel = (channel: any) => {
    setActiveChannel(channel);
    dispatch(setPrivateChannel(false))
    dispatch(setCurrentChannel(channel.id, channel.description, channel.name, channel.username, channel.profile_picture));
    setState((e: any) => { return { ...e, channel: channel } })
  };

  const displayChannels = (channels: any) =>
    channels.length > 0 &&
    channels.map((channel: any) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel}
        style={{ opacity: 0.7 }}
        active={channel.id === state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" /> STARRED
          </span>{" "}
          ({state.starredChannels.length})
        </Menu.Item>
      {/* {displayChannels(state.starredChannels)} */}
      {displayChannels(state.starredChannels)}
    </Menu.Menu>
  );
}

export default Starred


