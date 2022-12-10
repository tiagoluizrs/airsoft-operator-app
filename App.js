import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { Switch } from "./components";

import { storeData, verifyTheme } from "./util/storage";

import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { userIsLoggedIn, logout } from "./util/auth";
import { lightTheme, darkTheme } from "./theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCfUCSdvkkaxLPXOSMDFrFw4d6cC4Mgohs",
  authDomain: "airsoft-operator-app.firebaseapp.com",
  projectId: "airsoft-operator-app",
  storageBucket: "airsoft-operator-app.appspot.com",
  messagingSenderId: "356781310403",
  appId: "1:356781310403:web:1d7c7295d5a3e97ed7fd76",
  measurementId: "G-2DEMEBL51Z",
};
const firebaseApp = initializeApp(firebaseConfig);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState("light");
  
  const verifyLogin = async () => {
    if ((await userIsLoggedIn()) !== null) {
      setIsLoggedIn(true);
    }
  };

  const rightButtons = () => {
    return <>
              <Switch 
                value={mode === "dark"} 
                onValueChange={async () => {
                  let m = mode === "light" ? "dark" : "light";
                  setMode(m);
                  await storeData("mode", m);
                }}/>
            </>
  }


  useEffect(() => {
    verifyLogin();
    verifyTheme(setMode);
  }, []);

  return (
    <PaperProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let icon = "";
                switch (route.name) {
                  case "Home":
                    icon = "home";
                    break;
                  case "Profile":
                    icon = "account";
                    break;
                }

                return <Icon name={icon} size={size} color={color} />;
              },
              tabBarActiveTintColor: "blue",
              tabBarInactiveTintColor: "gray",
            })}
            initialRouteName="Home"
          >
            <Tab.Screen
              name="Home"
              component={Home}
              initialParams={{
                firebaseApp,
              }}
              options={{
                title: "Home",
                headerRight: rightButtons,
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Perfil",
                headerRight: rightButtons,
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
              initialParams={{
                setIsLoggedIn,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
              initialParams={{
                setIsLoggedIn,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}