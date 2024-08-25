import {Checkbox, Dialog, Fab, Grid, List, Snackbar, Topbar} from "@/components";
import {ScrollView} from "react-native";
import { StyleSheet } from 'react-native';
import {router} from "expo-router";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/services/fetcher";
import {getSession} from "@/services/auth";
import {Icon} from "react-native-paper";
import {deleteWeaponts} from "@/services/weapon";

export default function MyAegs() {
    const [checkedList, setCheckedList] = useState([]);
    const [profile_id, setProfileId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [messageText, setMessageText] = useState(null);
    const { data, error, isLoading, mutate } = useSWR(`profile-weapon/?profile__id=${profile_id}&&page_size=10&page=1`, fetcher);

    const loadUser = async () => {
        const data = await getSession();
        setProfileId(data.profile.id);
        mutate();
    }

    const selectToDelete = (id) => {
        if(checkedList.findIndex(el => el === id) > -1){
            setCheckedList(checkedList.filter(el => el !== id));
        }else{
            setCheckedList([...checkedList, id]);
        }
    }

    const goToEdit = (id) => {
        router.push({ pathname: `/form`, params: { id } });
    }

    const deleteChecked = async () => {
        try{
            const data = await deleteWeaponts(checkedList);
            if(data.status === 204){
                setCheckedList([]);
                mutate();
            }
            setMessageText(data.message);
        }catch(err){
            setMessageText("Erro ao excluir armamento(s).");
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return  <>
                <Grid hasTopBar={true}>
                        <Topbar
                            title="Minhas AEGs"
                            extraAction={checkedList.length > 0 ? {
                                icon: "delete",
                                onPress: async () => setDialogVisible(true)
                            } : null}
                        />
                        <ScrollView>
                            <Grid style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}>
                                <Grid style={{
                                    ...styles.padding
                                }}>
                                    {
                                        profile_id && data && data.results.length > 0 ? data.results?.map(item => <List onPress={() => goToEdit(item.id) } left={props => <Checkbox status={checkedList.findIndex(el => el === item.id) > -1 ? "checked" : ""} value={item.id} label={item.weapon_name} onPress={() => selectToDelete(item.id)}/>} />) : null
                                    }
                                </Grid>
                            </Grid>
                        </ScrollView>
                    </Grid>
                    <Dialog
                        icon={"alert"}
                        title={"Excluir armamento(s)"}
                        text={"Deseja realmente excluir estes armamento(s)?"}
                        visible={dialogVisible}
                        setVisibility={setDialogVisible}
                        onDismiss={() => setDialogVisible(false)}
                        actions={[
                            {
                                text: "Cancelar",
                                onPress: () => {
                                    setDialogVisible(false);
                                    setCheckedList([]);
                                    setMessageText("Ação cancelada");
                                }
                            },
                            {
                                text: "Excluir",
                                onPress: async () => {
                                    await deleteChecked();
                                    setDialogVisible(false);
                                }
                            }
                        ]}
                    />
                    <Snackbar
                        visible={messageText !== null}
                        onDismiss={() => setMessageText(null)}
                        text={messageText} />
                    <Fab
                        icon="plus"
                        onPress={() => {
                            router.push('form');
                        }}
                        style={{
                            bottom: 20,
                            position: 'absolute',
                            borderRadius: 200,
                            right: 20,
                        }}/>
            </>
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
};