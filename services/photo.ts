import * as ImagePicker from 'expo-image-picker';
import {firebaseApp} from "@/app/ctx";
import {getDownloadURL, getStorage, ref, uploadBytes, uploadString} from "firebase/storage";

const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
}

const uploadToFirebaseStorage = async (uri: string, username: string) => {
    const imageBlob = await uriToBlob(uri);

    try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `profile/${username}_${new Date().getTime()}`);
        await uploadBytes(storageRef, imageBlob);
        return await getDownloadURL(storageRef);   // Obtenha o URL de download
    } catch (error) {
        console.error("Erro ao fazer upload para o Firebase Storage:", error);
        throw error; // Re-lança o erro para o chamador lidar com ele
    }
    return null;
}

const resolveImageUrl = (url: string | null, firebaseUrlStorage: string) => {
    if(url){
        url = url.replace(firebaseUrlStorage, "");
        return url.split("&token")[0];
    }
    return null;
}

const generateImageUrl = async (image: any, username: string, url: string) => {
    image = image ? image.uri : null;

    const isUrl = image && image.includes('http');
    if (isUrl) {
        return image;
    } else {
        const result = await uploadToFirebaseStorage(image, username);
        return resolveImageUrl(result, url);
    }
}

const pickImage = async (setLoading: any, allowsMultipleSelection: boolean) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: allowsMultipleSelection,
        aspect: [4, 3],
        base64: true,
        quality: 1,
    });
    setLoading(true);

    if (!result.canceled) {
        if(allowsMultipleSelection){
            return result.assets;
        }else{
            return result.assets[0];
        }
    }
    setLoading(false);
};

const camera = async (setLoading: any) => {

}

export {
    pickImage, camera, generateImageUrl
}