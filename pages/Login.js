import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { login } from "../util/auth";
import { verifyTheme } from "../util/storage";

import { Avatar  } from 'react-native-paper';
import { TextInput, Button } from '../components';

const Login = ({ navigation, route }) => {
  const [mode, setMode] = useState("light" );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    verifyTheme(setMode);
  }, []);

  return (
    <View style={{
      ...style.box,
      backgroundColor: mode === 'light' ? '#fff' : '#000'
    }}>
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
      <Button style={style.button} mode="contained" onPress={async () => {
        const response = await login(email, password);
        if(response.status === 200){
          route.params.setIsLoggedIn(true);
          // navigation.navigate('Home');
        }
      }} label="Entrar"/>
      <Button style={style.button} onPress={() => navigation.navigate('Register')} label="Registrar"/>
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
      justifyContent: 'center',
      width: '100%',
      height: '100%',
  },
  input: {
      width: '100%'
  }
})

export default Login;
