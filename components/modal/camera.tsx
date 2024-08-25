import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// @ts-ignore
const CameraModal = forwardRef(({ visible, onClose, onCapture }, ref) => {
    const [cameraFacing, setCameraFacing] = useState<CameraType>('front');
    const [cameraRef, setCameraRef] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();

    useImperativeHandle(ref, () => ({
        takePicture: async () => {
            if (cameraRef) {
                // @ts-ignore
                const photo = await cameraRef.takePictureAsync({
                    base64: true,
                    quality: 1,
                    scale: 1
                });
                onCapture(photo);
                onClose();
            }
        },
    }));

    if (!permission) {
        // Camera permissions are still loading.
        return null;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            </Modal>
        );
    }

    const toggleCameraFacing = () => {
        setCameraFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                <CameraView
                    style={styles.camera}
                    facing={cameraFacing}
                    // @ts-ignore
                    ref={(ref) => setCameraRef(ref)}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            // @ts-ignore
                            onPress={() => ref.current.takePicture()}>
                            <Text style={styles.text}>Capture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 20,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default CameraModal;
