// Libs
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { userIsLoggedIn, logout } from "./util/auth";

// Customs (Theme, Envs etc)
import { lightTheme, darkTheme } from "./theme";
import { BASE_URL_API } from '@env';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Components
import { Switch } from "./components";

// Utils
import { storeData, verifyTheme } from "./util/storage";

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
              tabBarIcon: ({ color, size }) => {
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
              tabBarActiveTintColor: mode === 'light' ? lightTheme.colors.primary : darkTheme.colors.primary,
              tabBarInactiveTintColor: mode === 'light' ? 'gray' : "#fff",
            })}
            initialRouteName="Profile"
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerRight: rightButtons,
                headerStyle: {
                  backgroundColor: mode === 'light' ? lightTheme.colors.bgColor : darkTheme.colors.bgColor,
                },
                headerTintColor:  mode === 'light' ? lightTheme.colors.textColor : darkTheme.colors.textColor,
                tabBarStyle: {
                  backgroundColor: mode === 'light' ? lightTheme.colors.bgColor : darkTheme.colors.bgColor,
                }
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Perfil",
                headerRight: rightButtons,
                headerStyle: {
                  backgroundColor: mode === 'light' ? lightTheme.colors.bgColor : darkTheme.colors.bgColor,
                },
                headerTintColor:  mode === 'light' ? lightTheme.colors.textColor : darkTheme.colors.textColor,
                tabBarStyle: {
                  backgroundColor: mode === 'light' ? lightTheme.colors.bgColor : darkTheme.colors.bgColor,
                }
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