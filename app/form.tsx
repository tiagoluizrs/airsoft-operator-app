import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {Button, Checkbox, Grid, Radio, SearchModal, Snackbar, TextInput, Topbar} from "@/components";
import {ScrollView, Text} from "react-native";
import WeaponSearch from "@/app/fragments/weapon-search";
import {useTheme} from "react-native-paper";
import {getWeaponProfile, saveOrpdateWeaponProfile} from "@/services/weapon";
import {useSession} from "@/app/ctx";
import {getSession} from "@/services/auth";

const form = () => {
    const theme = useTheme();
    const { session: any } = useSession();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [weapon, setWeapon] = useState<ProfileWeaponInterface | null>(null);

    const loadData = async () => {
        const data = await getSession();

        if(params.id){
            const profileWeapon: any = await getWeaponProfile(params.id);

            setWeapon((v: any) => ({
                ...v,
                id: params.id,
                profile: data.profile.id,
                weapon: profileWeapon.data.weapon,
                weapon_name: profileWeapon.data.weapon_name,
                fps: profileWeapon.data.fps,
                upped: profileWeapon.data.upped,
                rating_normal: profileWeapon.data.rating_normal,
                rating_upper: profileWeapon.data.rating_upper,
            }));
        }else{
            setWeapon((v: any) => ({
                ...v,
                profile: data.profile.id,
            }));
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return <Grid hasTopBar={true}>
        <Topbar title={params.id ? "Editar arma" : "Adicionar arma"} back={true} backLink="(tabs)/my-aegs"/>
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
                    <TextInput
                        disabled={params.id !== null && params.id !== undefined}
                        label="Arma"
                        value={weapon?.weapon_name}
                        readOnly={true}
                        icon={"pencil"}
                        iconPress={() => {
                            if(!loading && (params.id === null || params.id === undefined)) {
                                setDialogVisible(true);
                            }
                        }}
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        disabled={true}
                        label="PFS"
                        value={weapon?.fps?.toString()}
                    />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Text>Nota: </Text>
                    <Radio
                        valueChecked={weapon?.rating_normal}
                        setChecked={(value: number) => {
                            setWeapon((v: any) => ({...v, rating_normal: value}));
                        }}
                        radios={[
                            {label: "1", value: 1, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_normal: value})); }},
                            {label: "2", value: 2, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_normal: value})); }},
                            {label: "3", value: 3, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_normal: value})); }},
                            {label: "4", value: 4, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_normal: value})); }},
                            {label: "5", value: 5, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_normal: value})); }},
                        ]}
                    />
                </Grid>

                <Grid style={{
                    ...styles.padding
                }}>
                    <Checkbox
                        label="Tem upgrade?"
                        status={weapon?.upped ? "checked" : "unchecked"}
                        onPress={() => {
                            setWeapon((v: any) => ({...v, upped: !weapon?.upped}));
                        }}
                    />
                </Grid>
                { weapon?.upped ?
                    <Grid style={{
                        ...styles.padding
                    }}>
                        <Text>Nota upada: </Text>
                        <Radio
                            valueChecked={weapon?.rating_upper}
                            radios={[
                                {label: "1", value: 1, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_upper: value})); }},
                                {label: "2", value: 2, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_upper: value})); }},
                                {label: "3", value: 3, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_upper: value})); }},
                                {label: "4", value: 4, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_upper: value})); }},
                                {label: "5", value: 5, setChecked: (value: number) => { setWeapon((v: any) => ({...v, rating_upper: value})); }},
                            ]}
                        />
                    </Grid> : null
                }

                <Grid style={{
                    ...styles.padding,
                    height: 100
                }}>
                    <Button
                        disabled={loading}
                        onPress={async () => {
                            setLoading(true);
                            const data = await saveOrpdateWeaponProfile(weapon.id, weapon);
                            if(data) {
                                setSnackMessage(data.message);
                                if(data.data !== null){
                                    router.navigate("/(tabs)/my-aegs");
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
            title={"Buscar arma"}
            visible={dialogVisible}
            setVisibility={setDialogVisible}
            onDismiss={() => setDialogVisible(false)}
        >
            <WeaponSearch
                current={weapon?.weapon}
                onDismiss={() => setDialogVisible(false)}
                onChange={(value: number, text: string, fps: number) => {
                    setWeapon((v: any) => ({...v, weapon: value, weapon_name: text, fps: fps.toString()}));
                    setDialogVisible(false);
                }}
            /></SearchModal>
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
};

export default form;