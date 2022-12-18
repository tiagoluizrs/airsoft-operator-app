import { View, StyleSheet } from "react-native";
import { getData } from "../util/storage";
import { useState, useEffect } from "react";
import { pickImage } from "../util/image";

import * as React from 'react';
import { Modal, Portal, Provider, useTheme } from 'react-native-paper';

import { TeamSelect, TextInput } from "../components";

const Profile = ({ route }) => {
  const theme = useTheme();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState("");

  const loadProfile = async () => {
    let user = await getData("user");
    setTeam(user.team_id)
    setTeamName(user.team_name)
    setEmail(user.email);
    setUsername(user.username);
  };

  const uploadPhoto = async () => {
    const image = await pickImage();
    setPhotoURL(image);
  };

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <View
      style={{
        alignSelf: "stretch",
        // justifyContent: "center",
        // alignItems: "center",
        height: "100%",
        padding: 20,
        backgroundColor: theme.colors.bgColor
      }}
    >
      {
        modal ? <Provider theme={theme}>
          <Portal>
            <Modal visible={modal} onDismiss={toggleModal} contentContainerStyle={style.modal}>
              <TeamSelect 
                queryText={teamName}
                onPress={(item) => {
                  setTeamName(item.name);
                  setTeam(item.id);
                  toggleModal();
                }}
              />
            </Modal>
          </Portal>
        </Provider> : <>
                        <TextInput
                          style={style.input}
                          mode="outlined"
                          label="Equipe"
                          value={teamName}
                          onFocus={toggleModal}
                        />
                        <TextInput
                            style={style.input}
                            mode="outlined"
                            label="E-mail"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput
                            style={style.input}
                            mode="outlined"
                            label="Usuário"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
        </>
      }
    </View>
  );
};

const style = StyleSheet.create({
  modal: {
    backgroundColor: 'white', 
    padding: 20,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    elevation: 0
  },
  avatar: {
      marginBottom: 10,
      backgroundColor: 'transparent',
      marginLeft: 'auto',
      marginRight: 'auto'
  },
  button: {
      marginTop: 10,
      width: '100%',
      borderRadius: 5
  },
  box: {
      padding: 20,
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
  },
  input: {
      width: '100%'
  }
})

export default Profile;
