// import { push } from "connected-react-router";

import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { IRootState } from '../../redux/store';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { setCurrentChannel, setPrivateChannel } from "../../redux/channel/action"
// import { Link } from "react-router-dom";

function Channels(props: any) {
  const dispatch = useDispatch()
  const bearer: string = "Bearer " + localStorage.token;
  const { REACT_APP_API_SERVER } = process.env;
  const currentUser = useSelector((state: IRootState) => state.auth.payload)
  const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)
  const [state, setState] = useState<any>({
    activeChannel: "",
    user: currentUser,
    channel: currentChannel,
    channels: [],
    modal: false,
    firstLoad: true,
    nameofChannel: "",
    channelDetails: "",
  })
  const [isAddingfinished, setisAddingfinished] = useState<number>(0);

  useEffect(() => {
    fetchChannelSidebarDataJSON();
    return () => {
    }
  }, [])

  const setActiveChannel = (channel: any) => {
    setState((e: any) => { return { ...e, activeChannel: channel.id } });
  };

  
  // fetch channel name
  const fetchChannelSidebarDataJSON = async () => {
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/channel-sidebar`, {
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
        setState((e: any) => { return { ...e, channels: response } })
        // setFirstchannel
        dispatch(setCurrentChannel(response[0].id, response[0].description, response[0].name, response[0].username, response[0].profile_picture))
        setActiveChannel(state.channel)
        setState((e: any) => { return { ...e, channel: response[0] } })
      }
    }
    setState((e: any) => { return { ...e, firstLoad: false } })
  }


  const addChannelSidebarDataJSON = async (name: string, description: string) => {
    const addChannelJSON = await fetch(`${REACT_APP_API_SERVER}/chatroom/add-channel`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, description })
    })
    if (addChannelJSON.status === 200) {
      setisAddingfinished(isAddingfinished => isAddingfinished + 1);
      fetchChannelSidebarDataJSON()
    }
  }


  const handleSubmit = async () => {
    if (state.channelDetails && state.nameofChannel && state.channelDetails !== "" && state.nameofChannel !== "") {
      await addChannelSidebarDataJSON(state.nameofChannel, state.channelDetails);
    };
    closeModal()
  };

  const changeChannel = (channel: any) => {
    setActiveChannel(channel);
    dispatch(setPrivateChannel(false))
    dispatch(setCurrentChannel(channel.id, channel.description, channel.name, channel.username, channel.profile_picture));
    setState((e: any) => { return { ...e, channel: channel } })
  };

  const channelNameHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((oldStuff: any) => { return { ...oldStuff, nameofChannel: e.target.value } });

  }
  const channelDetailHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((oldStuff: any) => { return { ...oldStuff, channelDetails: e.target.value } });
  }

  const displayChannels = (channels: any) =>
    channels.length > 0 &&
    channels.map((channel: any) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  const openModal = () => setState((e: any) => { return { ...e, modal: true } });

  const closeModal = () => setState((e: any) => { return { ...e, modal: false } });

  const { modal } = state;



  
  return (

    <React.Fragment>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({state.channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels(state.channels)}
      </Menu.Menu>

      {/* Add Channel Modal */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form >
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                value={state.nameofChannel}
                onChange={channelNameHandleChange}
              />

            </Form.Field>

            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                value={state.channelDetails}
                onChange={channelDetailHandleChange}
              />

            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" onClick={handleSubmit}>
            <Icon name="checkmark" inverted /> Add
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="remove" inverted /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  )
}

export default Channels
