import { View, Text } from "react-native";
import { useState, useEffect } from "react";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <View
      style={{
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 20,
      }}
    ><Text>Home</Text></View>
  );
};

export default Home;
