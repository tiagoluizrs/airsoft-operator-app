import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { register } from "../util/auth";

import { Avatar  } from 'react-native-paper';
import { TextInput, Button } from '../components';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={style.box}>
      <Avatar.Image 
          style={style.avatar}
          size={150} source={require('../assets/logo.png')} />
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
          label="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
      />
      <Button style={style.button} mode="contained" onPress={() => register(email, password)} label="Registrar"/>
      <Button style={style.button} onPress={() => navigation.navigate('Login')} label="Entrar"/>
    </View>
  );
};

const style = StyleSheet.create({
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
      backgroundColor: '#fff',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
  },
  input: {
      width: '100%'
  }
})

export default Register;
