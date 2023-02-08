import * as ImagePicker from "expo-image-picker";

import {
  getStorage as firebaseGetStorage,
  ref,
  uploadString,
  getDownloadURL
} from 'firebase/storage'

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    alert(JSON.stringify(result.assets[0]))
    return result.assets[0].uri;
  }
  return null;
};


const saveImageToBase64ToUrl = async (fiebaseApp, prefix, imageB64) => {
  const filename = `${prefix}_profile.png`
  const storage = firebaseGetStorage(fiebaseApp);
  const storageRef = ref(storage, filename);

  try{
      await uploadString(storageRef, imageB64, "data_url");
      return filename;
  }catch(err){
      console.log(err)
      throw err;
  }
}   

const getFile = async  (fiebaseApp, filename) => {
  const storage = firebaseGetStorage(fiebaseApp);
  const storageRef = ref(storage, filename);

  return await getDownloadURL(storageRef);
}

export { pickImage, saveImageToBase64ToUrl, getFile };
