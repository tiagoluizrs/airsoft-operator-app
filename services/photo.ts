import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    pickImage, camera
}