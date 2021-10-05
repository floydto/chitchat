import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Segment, Button, Input, Icon } from "semantic-ui-react";
import { IRootState } from "../../redux/store";

const MessageForm = (props: any) => {
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)
  const isPrivateChannel = useSelector((state: IRootState) => state.channel.isPrivateChannel)
  const { REACT_APP_API_SERVER } = process.env;
  const bearer: string = "Bearer " + localStorage.token;
  const booleanCovert = (isPrivateChannel: boolean) => {
    if (isPrivateChannel == true) {
      return "0"
    } else {
      return "1"
    }
  }

  const [state, setState] = useState({
    uploadState: "",
    message: "",
    channel: props.currentChannel,
    user: props.currentUser,
    privateChannel: isPrivateChannel,
    numberFormPm: booleanCovert(isPrivateChannel),
    loading: false,
    errors: [],
    modal: false,
    content: "",
    message_picture: ""
  });

  const openModal = () => setState((e) => { return { ...e, modal: true } })

  const closeModal = () => setState((e) => { return { ...e, modal: false } })

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
    const { message, channel, user } = state;
  };

  const AddMessageDataJSON = async (content: string) => {
    const addChannelJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/sendmessage`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isPm: isPrivateChannel, sender_id: currentUser.id, channel_id: currentChannel.id, content })
    })
    if (addChannelJSON.status === 200) {
      setState((e) => { return { ...e, content: "" } });
    }
  }

  const handleSubmit = async () => {
    if (state.content !== "" && state.content !== null) {
      await AddMessageDataJSON(state.content);
    }
  };

  const contentHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((oldStuff: any) => { return { ...oldStuff, content: e.target.value } });
  }

  const addFile = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setState((e: any) => { return { ...e, message_picture: file } });
    }
  };

  const sendFile = async () => {
    if (state.message_picture !== null && state.message_picture !== "") {
      const { numberFormPm, message_picture, channel, user } = state;
      const formData = new FormData()
      formData.append('isPm', numberFormPm)
      formData.append("channel_id", channel.id)
      formData.append("sender_id", user.id)
      formData.append("receiver_id", channel.id)
      formData.append('message_picture', message_picture)
      const responseJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/sendimage`, {
        headers: {
          Authorization: bearer,
        },
        method: "POST",
        body: formData
      })
      if (responseJSON.status === 200) {
        setState((e) => { return { ...e, message_picture: "" } })
        closeModal()
      }
      console.log(responseJSON);
      
    }
  }

  const { errors, modal } = state;

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        onChange={contentHandleChange}
        onKeyDown={handleKeyDown}
        value={state.content}
        style={{ marginBottom: "0.7em" }}
        labelPosition="left"
        className={
          errors.some((error: { message: string | string[]; }) => error.message.includes("message"))
            ? "error"
            : ""
        }
        placeholder="Write your message"

      />

      <Button.Group icon widths="2">
        <Button
          onClick={handleSubmit}
          disabled={state.loading}
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
        />
        <Button
          color="teal"
          disabled={state.uploadState === "uploading"}
          onClick={openModal}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />

      </Button.Group>

      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            onChange={addFile}
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={sendFile} color="green" inverted>
            <Icon name="checkmark" /> Send
          </Button>
          <Button onClick={closeModal} color="red" inverted >
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>

    </Segment>
  );
}


export default MessageForm;






