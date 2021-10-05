import React, { useEffect, useState } from "react";

import 'semantic-ui-css/semantic.min.css'
import { useDispatch, useSelector } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { IRootState } from "../../redux/store";


const MessagesHeader = (props: any) => {
  const bearer: string = "Bearer " + localStorage.token;
  const { REACT_APP_API_SERVER } = process.env;
  const dispatch = useDispatch()
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)
  const isPrivateChannel = useSelector((state: IRootState) => state.channel.isPrivateChannel)
  const [state, setState] = useState({
    channel: currentChannel,
    messagesLoading: props.messagesLoading,
    user: currentUser,
    listeners: props.listeners,
    messages: props.channel,
    numUniqueUsers: props.numUniqueUsers,
    handleSearchChange: props.handleSearchChange,
    searchResults: props.searchResults,
    searchLoading: props.searchLoading,
    isPrivateChannel: isPrivateChannel,
    handleStar: props.handleStar,
    isChannelStarred: false,
  });

  useEffect(() => {
    if (isPrivateChannel == false) {
      fetchStarredChannelDataJSON() 
    }
    return () => {
    }
  }, [])

  const handleStar = async () => {
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/isStarredChannel`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: currentUser.id, channel_id: currentChannel.id })
    })
    if (responseJSON.status === 200) {
      const response = await responseJSON.json();
      const starredState = response[0].starredOrNot;
      setState((e: any) => { return { ...e, isChannelStarred: starredState } });
    }
  };

  const fetchStarredChannelDataJSON = async () => {
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/isStarredState`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: currentUser.id })
    })
    if (responseJSON.status === 200) {
      const response = await responseJSON.json();
      if (response && response[0] !== undefined) {
        const starredState = response.find((x: any) => x.id === currentChannel.id).starredOrNot;
        setState((e: any) => { return { ...e, isChannelStarred: starredState } });
      }
    }
  }

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          #{currentChannel.name}
          {!isPrivateChannel && (
            <Icon
              onClick={handleStar}
              name={state.isChannelStarred ? "star" : "star outline"}
              color={state.isChannelStarred ? "yellow" : "black"}
            />
          )}
        </span>
        <Header.Subheader> users</Header.Subheader>
      </Header>


      {/* Channel Search Input */}
      <Header floated="right">
        <Input
          loading={state.searchLoading}
          onChange={state.handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
}

export default MessagesHeader


