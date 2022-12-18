import { View, Text } from "react-native";
import { useEffect } from "react";
import { useTheme } from 'react-native-paper';

const Home = () => {
  const theme = useTheme();
  
  useEffect(() => {}, []);

  return (
    <View
      style={{
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 20,
        backgroundColor: theme.colors.bgColor
      }}
    ><Text>Home</Text></View>
  );
};

export default Home;
