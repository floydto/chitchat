import React, { useState, useEffect } from 'react'
import AvatarEditor from "react-avatar-editor";
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../redux/Auth/thunk'
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from "semantic-ui-react";
import { UserInfo } from '../../redux/Auth/action';

function UserPanel(props: any) {
  const dispatch = useDispatch()
  const { REACT_APP_API_SERVER } = process.env;
  const bearer: string = "Bearer " + localStorage.token;
  const [state, setState] = useState({
    user: props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    toUploadImage: {},
    blob: null,
    uploadedCroppedImage: "",
  });
  const openModal = () => setState((e) => { return { ...e, modal: true } });

  const closeModal = () => setState((e) => { return { ...e, modal: false } });

  const handleSignout = () => {
    dispatch(logoutThunk());
  };


  const fetchUserData = async () => {
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/profile/get-user`, {
      headers: {
        Authorization: bearer, 
      },
      method: "GET",
    })
    if (responseJSON.status === 200) {
      const response = await responseJSON.json();
      const { created_at, id, profile_picture, username } = response.userInfo
      dispatch(UserInfo(created_at, id, profile_picture, username))
      setState((e) => { return { ...e, user: { created_at, id, profile_picture, username } } })
    }
  }

  const changeAvatar = (url: string) => {
    let { created_at, id, username } = state.user
    dispatch(UserInfo(created_at, id, url, username))
    setState((e) => { return { ...e, user: { created_at, id, profile_picture: url, username } } })
    closeModal();
  };
  
  const uploadCroppedImage = async () => {
    const { toUploadImage }: any = state;
    const formData = new FormData()
    formData.append("profileImage", toUploadImage)
    const responseJSON = await fetch(`${REACT_APP_API_SERVER}/profile/avatar-update`, {
      headers: {
        Authorization: bearer,
      },
      method: "PUT",
      body: formData
    })
    if (responseJSON.status === 200) {
      const response = await responseJSON.json()
      setState((e) => { return { ...e, uploadedCroppedImage: response.url } })
      changeAvatar(response.url)
    }
  };

  
  
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setState((e: any) => {
          return {
            ...e,
            previewImage: reader.result
          }
        });
      });
      setState((e: any) => {
        return {
          ...e,
          toUploadImage: file
        }
      });
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])


  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{state.user.username}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span onClick={openModal}>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={handleSignout}>Sign Out</span>
    }
  ];
  

  return (
    <Grid style={{ background: props.primaryColor }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="comments" />
            <Header.Content>ChitChat</Header.Content>
          </Header>

          {/* User Dropdown  */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  {state.user.profile_picture && <Image src={state.user.profile_picture.includes('gravatar') ? state.user.profile_picture : `${REACT_APP_API_SERVER}/${state.user.profile_picture}`} spaced="right" avatar />}
                  {state.user.username}
                </span>

              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>

        {/* Change User Avatar Modal   */}
        <Modal basic open={state.modal} onClose={closeModal}>
          <Modal.Header>Change Avatar</Modal.Header>
          <Modal.Content>
            <Input
              onChange={handleChange}
              fluid
              type="file"
              label="New Avatar"
              name="previewImage"
            />
            <Grid centered stackable columns={2}>
              <Grid.Row centered>
                <Grid.Column className="ui center aligned grid">
                  {state.previewImage && (
                    <AvatarEditor
                      ref={() => {}}
                      image={state.previewImage}
                      width={120}
                      height={120}
                      border={50}
                      scale={1.2}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            {state.previewImage && (
              <Button
                color="green"
                inverted
                onClick={uploadCroppedImage}
              >
                <Icon name="save" /> Change Avatar
              </Button>
            )}
            <Button color="red" inverted onClick={closeModal}>
              <Icon name="remove" /> Cancel
              </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default UserPanel
