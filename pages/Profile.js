import { View, StyleSheet } from "react-native";
import { getData } from "../util/storage";
import { useState, useEffect } from "react";
import { pickImage } from "../util/image";

import * as React from 'react';
import { Avatar, Button, Card, FAB, Modal, Portal, Provider, useTheme } from 'react-native-paper';

import { TeamSelect, TextInput } from "../components";
import { update } from "../util/user";

const Profile = ({ route }) => {
  const theme = useTheme();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState("");
  const [photoURL, setPhotoURL] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  const [photoURLShow, setPhotoURLShow] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

  const loadProfile = async () => {
    let user = await getData("user");
    setTeam(user.team_id)
    setTeamName(user.team_name)
    setEmail(user.email);
    setUsername(user.username);
    if(user.photoURL !== null && user.photoURL !== undefined){
      try{
          setPhotoURLShow(await getFile(route.params.firebaseApp, user.photoURL))
      }catch(err){

      }
    }
  };

  const uploadPhoto = async () => {
    const image = await pickImage();
    setPhotoURL(image);
    setPhotoURLShow(image);
}

  useEffect(() => {
    loadProfile();
  }, []);
  return (<>
    {
        modal ? <View style={{
          alignSelf: "stretch",
          height: "100%",
          padding: 20,
          backgroundColor: theme.colors.bgColor
        }}
      >
      <Provider theme={theme}>
          <Portal syle={{}}>
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
        </Provider> 
        </View>: <View
                        style={{
                          alignSelf: "stretch",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          padding: 20,
                          backgroundColor: theme.colors.bgColor
                        }}
                      >
                   <Card style={style.card}>
                        <Avatar.Image 
                            style={style.avatar}
                            size={150} source={{ uri: photoURLShow}} />
                         <FAB
                            icon="folder-image"
                            style={{
                                ...style.fab,
                                right: '-12.5%'
                            }}
                            onPress={uploadPhoto}
                        />
                    </Card>
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
                        <Button style={style.button} onPress={() => update(route.params.firebaseApp, {
                          team,
                          email,
                          photoURL
                        })} label="Salvar"/>
        </View>
      }
    </>
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
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 30,    
  },
  card: {
    elevation: 0,
    boxShadow: 'null',
    shadowColor: 'transparent',
    backgroundColor: 'tranparent',
    marginBottom: 16
  },
  avatar: {
    marginBottom: 10,
    borderRadius: 30, 
    backgroundColor: 'transparent'
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
