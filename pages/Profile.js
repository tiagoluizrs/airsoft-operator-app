import { View, Text } from "react-native";
import { getData, getFile } from "../util/storage";
import { useState, useEffect } from "react";
import { pickImage } from "../util/image";

import { update } from "../util/user";

const Profile = ({ route }) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [snackBarShow, setSnackBarShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    let user = await getData("user");
    setEmail(user.email);
    setDisplayName(user.displayName);
    setPhoneNumber(user.phoneNumber);
    try {
      setPhotoURL(await getFile(route.params.firebaseApp, user.photoURL));
    } catch (err) {
      alert("Erro ao carregar imagem");
    }
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
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 20,
      }}
    >
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
