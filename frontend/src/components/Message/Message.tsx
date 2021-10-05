/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import "../../css/Chatroom.css"

//Single message column
const Message = (props: any) => {
  const { REACT_APP_API_SERVER } = process.env;

  const isOwnMessage = (message: any, user: any) => {
    return message.sender_id === user.id ? "message__self" : "";
  };

  const isImage = (message: any) => {
    return message.message_picture && !message.content;
  };

  const timeFromNow = (TimeStamp: moment.MomentInput) => moment(TimeStamp).fromNow();

  const { message, user } = props
  return (
    <Comment>
      <Comment.Avatar src={message.profile_picture.includes('gravatar') ? message.profile_picture : `${REACT_APP_API_SERVER}/${message.profile_picture}`} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as="a">{message.username}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.datetime)}</Comment.Metadata>
        {isImage(message) ? (
          <Image src={`${REACT_APP_API_SERVER}/${message.message_picture}`} className="message__image" />
        ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
      </Comment.Content>
    </Comment>
  )
}


export default Message
