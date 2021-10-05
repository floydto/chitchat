import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
import {
    Segment,
    Accordion,
    Header,
    Icon,
    Image,
    List
} from "semantic-ui-react";
import { IRootState } from '../../redux/store';

function MetaPanel(props: any) {
    const dispatch = useDispatch()
    const { REACT_APP_API_SERVER } = process.env;
    const [state, setState] = useState({
        channel: props.currentChannel,
        privateChannel: props.isPrivateChannel,
        activeIndex: 0
    });
    const isPrivateChannel = useSelector((state: IRootState) => state.channel.isPrivateChannel)
    const currentUser = useSelector((state: IRootState) => state.auth.payload)
    const currentChannel = useSelector((state: IRootState) => state.channel.currentChannel)

    useEffect(() => {
    }, [])

    const setActiveIndex = (event: any, titleProps: any) => {
        const { index } = titleProps;
        const { activeIndex } = state;
        const newIndex = activeIndex === index ? -1 : index;
        setState((e) => { return { ...e, activeIndex: newIndex } });
    };
    return (
        <Segment>
            {/* loading={!state.channel} */}
            <Header as="h3" attached="top">
                About # {currentChannel && currentChannel.name}
            </Header>
            <Accordion styled attached="true">
                <Accordion.Title
                    active={state.activeIndex === 0}
                    index={0}
                    onClick={setActiveIndex}>
                    <Icon name="dropdown" />
                    <Icon name="info" />
                            Channel Details
                            <Accordion.Content active={state.activeIndex === 0}>
                        {currentChannel && currentChannel.description}
                    </Accordion.Content>
                </Accordion.Title>
                <Accordion.Content active={state.activeIndex === 1}>
                </Accordion.Content>

                <Accordion.Title
                    active={state.activeIndex === 2}
                    index={2}
                    onClick={setActiveIndex}
                >
                    <Icon name="dropdown" />
                    <Icon name="pencil alternate" />
            Created By
            </Accordion.Title>
                <Accordion.Content active={state.activeIndex === 2}>
                    <Header as="h3">
                        <Image avatar src={currentChannel && currentChannel.createdBy!.profile_picture!.includes('gravatar')
                            ? currentChannel.createdBy.profile_picture
                            : `${REACT_APP_API_SERVER}/${currentChannel.createdBy.profile_picture}`} spaced="right" />
                        {currentChannel && currentChannel.createdBy.username}
                    </Header>
                </Accordion.Content>
            </Accordion>
        </Segment>

    );
};

export default MetaPanel