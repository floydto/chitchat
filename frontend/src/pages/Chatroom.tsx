import React from 'react'
import SidePanel from '../components/SidePanel/SidePanel'
import { useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { Grid } from "semantic-ui-react";
import MetaPanel from '../components/MetaPanel/MetaPanel';
import Messages from '../components/Message/Messages'; 



function Chatroom() {
    const currentUser = useSelector((state: IRootState) => state.auth.payload)
    const channel = useSelector((state: IRootState) => state.channel)
    const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)
    const isPrivateChannel = useSelector((state: IRootState) => state.channel.isPrivateChannel)
    const userPosts = useSelector((state: IRootState) => state.channel.userPosts)

    

    return (
        <Grid columns="equal" className="app" style={{ background: channel.secondaryColor }}>
            <SidePanel key={currentUser && currentUser.id}
                currentUser={currentUser}
                primaryColor={channel.primaryColor}
            />

            <Grid.Column style={{ marginLeft: 320 }}>
            <Messages
                key={currentChannel && currentChannel.id}
                currentChannel={currentChannel.id}
                currentUser={currentUser}
                isPrivateChannel={isPrivateChannel}
                /> 
            </Grid.Column>

            <Grid.Column width={4}>
            {!isPrivateChannel && <MetaPanel
                key={currentChannel && currentChannel.name}
                userPosts={userPosts}
                currentChannel={currentChannel}
                isPrivateChannel={isPrivateChannel}
                />}
            </Grid.Column>

        </Grid>
    )
}

export default Chatroom
