import React, { useEffect, useRef, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../redux/channel/action";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import Skeleton from "./Skeleton";
import {
  setCurrentChannel,
  setPrivateChannel,
} from "../../redux/channel/action";
import { IRootState } from "../../redux/store";
import { Scrollbars } from "react-custom-scrollbars";

function Messages(props: any) {
  const bearer: string = "Bearer " + localStorage.token;
  const { REACT_APP_API_SERVER } = process.env;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => state.auth.payload);
  const currentChannel = useSelector(
    (state: IRootState) => state.channel.currentChannel
  );
  const isPrivateChannel = useSelector(
    (state: IRootState) => state.channel.isPrivateChannel
  );
  const userPosts = useSelector((state: IRootState) => state.channel.userPosts);
  const [state, setState] = useState({
    privateChannel: isPrivateChannel,
    messages: [],
    messagesLoading: true,
    channel: currentChannel,
    isChannelStarred: false,
    user: currentUser,
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
    listeners: [],
  });

  useEffect(() => {
    if (isPrivateChannel == true) {
      fetchPrivateMessages();
    } else {
      fetchChannelMessages();
    }
  }, [state.messages]);

  const fetchChannelMessages = async () => {
    const fetchChannelSenderIdJSON = await fetch(
      `${REACT_APP_API_SERVER}/chatroom/channel-message-info`,
      {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          channel_id: currentChannel.id,
        }),
      }
    );

    if (fetchChannelSenderIdJSON.status === 200) {
      const ChannelMessages = await fetchChannelSenderIdJSON.json();
      if (ChannelMessages && ChannelMessages[0] !== undefined) {
        setState((e: any) => {
          return { ...e, messages: ChannelMessages };
        });
      }
    }
  };

  const fetchPrivateMessages = async () => {
    const fetchChannelSenderIdJSON = await fetch(
      `${REACT_APP_API_SERVER}/chatroom/private-message-info`,
      {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myUserId: currentUser.id,
          userId: currentChannel.id,
        }),
      }
    );

    if (fetchChannelSenderIdJSON.status === 200) {
      const ChannelMessages = await fetchChannelSenderIdJSON.json();
      if (ChannelMessages && ChannelMessages[0] !== undefined) {
        setState((e: any) => {
          return { ...e, messages: ChannelMessages };
        });
      }
    }
  };

  const handleStar = async () => {
    const responseJSON = await fetch(
      `${REACT_APP_API_SERVER}/chatroom/isStarredChannel`,
      {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          channel_id: currentChannel.id,
        }),
      }
    );
    if (responseJSON.status === 200) {
      const response = await responseJSON.json();
      if (response !== undefined) {
        setState((e: any) => {
          return { ...e, isChannelStarred: response.starredOrNot };
        });
      }
    }
  };

  const handleSearch = (event: any) => {
    setState((e: any) => {
      return {
        ...e,
        searchTerm: event.target.value,
        searchLoading: true,
      };
    });
    const channelMessages = [...state.messages];
    const regex = new RegExp(state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc: any, message: any) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setState((e: any) => {
      return { ...e, searchResults };
    });
    setTimeout(
      () =>
        setState((e: any) => {
          return { ...e, searchLoading: false };
        }),
      1000
    );
  };

  const displayMessages = (messages: any) =>
    messages.length > 0 &&
    messages.map((message: any) => (
      <Message key={message.datatime} message={message} user={state.user} />
    ));

  const displayChannelName = (channel: { name: any }) => {
    return channel ? `${state.privateChannel ? "@" : "#"}${channel.name}` : "";
  };

  const displayMessageSkeleton = (loading: any) =>
    loading ? (
      <React.Fragment>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </React.Fragment>
    ) : null;

  return (
    <React.Fragment>
      <MessagesHeader
        channelName={displayChannelName(state.channel)}
        numUniqueUsers={state.numUniqueUsers}
        handleSearchChange={handleSearch}
        searchLoading={state.searchLoading}
        isPrivateChannel={state.privateChannel}
        handleStar={handleStar}
        isChannelStarred={state.isChannelStarred}
      />

      <Segment>
        <Comment.Group className="messages">
          {displayMessageSkeleton(state.messagesLoading)}
          <Scrollbars
            style={{ width: 600, height: 450, scrollBehavior: "smooth" }}
          >
            {state.searchTerm
              ? displayMessages(state.searchResults)
              : displayMessages(state.messages)}
          </Scrollbars>
        </Comment.Group>
      </Segment>

      {/* <MessageForm/> */}
      <MessageForm
        currentChannel={state.channel}
        currentUser={state.user}
        isPrivateChannel={state.privateChannel}
      />
    </React.Fragment>
  );
}

export default Messages;
