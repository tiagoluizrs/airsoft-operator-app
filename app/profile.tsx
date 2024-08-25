// @ts-nocheck
import {Avatar, Button, Fab, Grid, SearchModal, Snackbar, TextInput, Topbar} from "@/components";
import {useEffect, useRef, useState} from "react";
import {ScrollView, Text} from "react-native";
import {useTheme} from "react-native-paper";
import ParentSearch from "@/app/fragments/patent-search";
import TeamSearch from "@/app/fragments/team-search";
import {pickImage,camera} from "@/services/photo";
import CameraModal from "@/components/modal/camera";
import {updateUser} from "@/services/profile";
import {getSession} from "@/services/auth";

export default function ProfileScreen() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [searchType, setSearchType] = useState(null);
    const [profile, setProfile] = useState<ProfileInterface | null>({
        id: null,
        user: {
            id: null,
            username: null,
            email: null,
            firstName: null,
            lastName: null,
        },
        image: null,
        team: null,
        patent: null,
        team_name: null,
        patent_name: null
    });

    const [cameraVisible, setCameraVisible] = useState(false);
    const cameraRef = useRef(null);

    const handleCapture = (data: any) => {
        setProfile((v: any) => ({...v, image: data}));
        setLoading(false);
    };

    const loadData = async () => {
        const data = await getSession();
        data.profile = {
            ...data.profile,
            image: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_URL + data.profile.image
        }
        setProfile(data.profile);
    }

    useEffect(() => {
        loadData();
    }, []);

    // @ts-ignore
    return  <Grid hasTopBar={true}>
                <Topbar title="Perfil" back={true}/>
                <ScrollView>
                    <Grid style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        <Grid>
                            <Grid style={{
                                ...styles.containerImage
                            }}>
                                <Grid style={{
                                    ...styles.containerCenterImage
                                }}>
                                    {
                                        profile.image ?
                                            profile.image?.toString().indexOf("http") !== -1 ?
                                                <Avatar size={230} source={{uri: profile.image}} /> :
                                                <Avatar size={230} source={profile.image} />
                                            : <Avatar size={230} icon="account" />
                                    }
                                    <Fab
                                        icon="image"
                                        style={{
                                            ...styles.fab,
                                            ...styles.left
                                        }}
                                        onPress={async () => {
                                            const data = await pickImage(setLoading, false);
                                            setProfile((v: any) => ({...v, image: data}));
                                            setLoading(false);
                                        }}/>
                                    <Fab
                                        icon="camera"
                                        onPress={() => {
                                            setLoading(true);
                                            setCameraVisible(true)
                                        }}
                                        style={{
                                            ...styles.fab,
                                            ...styles.right
                                        }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid style={{
                            marginTop: 30,
                            ...styles.padding
                        }}>
                            <TextInput
                                label="Usuário"
                                value={profile?.user?.username}
                                onChangeText={(text: string) => {
                                    setProfile((v: any) => ({...v, user: {
                                            ...v.user,
                                            username: text
                                    }}));
                                }}
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                label="E-mail"
                                value={profile?.user?.email}
                                name="email"
                                onChangeText={(text: string) => {
                                    setProfile((v: any) => ({...v, user: {
                                        ...v.user,
                                        email: text
                                    }}));
                                }}
                                keyboardType="email-address"
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                label="Nome"
                                value={profile?.user?.first_name}
                                name="first_name"
                                onChangeText={(text: string) => {
                                    setProfile((v: any) => ({...v, user: {
                                        ...v.user,
                                        first_name: text
                                    }}));
                                }}
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                label="Sobrenome"
                                value={profile?.user?.last_name}
                                name="last_name"
                                onChangeText={(text: string) => {
                                    setProfile((v: any) => ({...v, user: {
                                        ...v.user,
                                        last_name: text
                                    }}));
                                }}
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                label="Patente"
                                value={profile?.patent_name}
                                readOnly={true}
                                icon={"pencil"}
                                iconPress={() => {
                                    setDialogVisible(true);
                                    // @ts-ignore
                                    setSearchType(1);
                                }}
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                label="Equipe"
                                value={profile?.team_name}
                                readOnly={true}
                                icon={"pencil"}
                                iconPress={() => {
                                    setDialogVisible(true);
                                    setSearchType(2);
                                }}
                            />
                        </Grid>
                        <Grid style={{
                            ...styles.padding,
                            height: 100
                        }}>
                            <Button
                                onPress={async () => {
                                    setLoading(true);
                                    const data = await updateUser(profile.id, profile, process.env.EXPO_PUBLIC_FIREBASE_STORAGE_URL);
                                    if(data) {
                                        setSnackMessage(data.message);
                                        if(data.data !== null){
                                            loadData();
                                        }
                                    }
                                    else{
                                        setSnackMessage("Erro genérico ao atualizar dados.");
                                    }
                                    setLoading(false);
                                }}
                                mode="contained"
                                loading={loading}
                                style={{ backgroundColor: theme.colors.primary }}
                            >Salvar</Button>
                        </Grid>
                    </Grid>
                </ScrollView>
                <SearchModal
                    title={searchType === 1 ? "Escolha sua patente" : "Escolha sua equipe"}
                    visible={dialogVisible}
                    setVisibility={setDialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                >{ searchType === 1 ? <ParentSearch
                                        current={profile?.patent}
                                        onDismiss={() => setDialogVisible(false)}
                                        onPress={(value: number, text: string) => {
                                            setProfile((v: any) => ({...v, patent: value, patent_name: text}));
                                            setDialogVisible(false);
                                        }}
                                        /> : <TeamSearch
                                                current={profile?.team}
                                                onDismiss={() => setDialogVisible(false)}
                                                onChange={(value: number, text: string) => {
                                                    setProfile((v: any) => ({...v, team: value, team_name: text}));
                                                    setDialogVisible(false);
                                                }}
                                                /> }</SearchModal>
                <CameraModal
                    visible={cameraVisible}
                    onClose={() => setCameraVisible(false)}
                    onCapture={handleCapture}
                    ref={cameraRef}
                />
                <Snackbar
                    visible={snackMessage !== null}
                    duration={3000}
                    onDismiss={() => setSnackMessage(null)}
                    text={snackMessage}
                />
            </Grid>
}

const styles = {
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    padding: {
        padding: 16
    },
    containerCenterImage: {
        width: 230,
        position: 'relative',
    },
    fab: {
        bottom: 0,
        position: 'absolute',
        borderRadius: 200
    },
    right: {
        right: 0,
    },
    left: {
        left: 0
    }
}
