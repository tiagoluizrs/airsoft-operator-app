import {Link, router, useLocalSearchParams} from 'expo-router';
import { ScrollView } from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import {Avatar, Button, Grid, Snackbar, TextInput} from "@/components";
import {useState} from "react";
import {confirmEmail, register} from "@/services/auth";

export default function SignUp() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [code, setCode] = useState('');
    const params = useLocalSearchParams();

    // @ts-ignore
    return (
        <ScrollView>
            <Grid style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                <Grid style={{
                    ...styles.container,
                    ...styles.padding,
                    marginTop: 50
                }}>
                    <Avatar size={200} source={require('../assets/images/icon.png')}/>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Text style={{
                        fontSize: 28,
                        width: '100%',
                        textAlign: 'center'
                    }}>Confirmar</Text>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        maxLength={6}
                        value={code}
                        keyboardType="default"
                        onChangeText={setCode}
                        label="CÓDIGO" />
                </Grid>
                <Grid style={{
                    ...styles.padding,
                    textAlign: 'center'
                }}>
                    <Link href="/sign-up" style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline'
                    }}>Criar uma conta</Link>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Button loading={loading}
                            mode="contained"
                            style={{ backgroundColor: theme.colors.primary }}
                            onPress={async () => {
                                setLoading(true);

                                const data = await confirmEmail(params.email, code);
                                if(data) {
                                    if (data.status === 200) {
                                        // @ts-ignore
                                        setSnackMessage("Usuário confirmado com sucesso!!!");
                                        setTimeout(() => {
                                            router.push("/sign-in");
                                        }, 3000)
                                    } else {
                                        if (data.data.message) {
                                            setSnackMessage(data.data.message);
                                        } else {
                                            // @ts-ignore
                                            setSnackMessage("Erro ao validar e-mail");
                                        }
                                    }
                                }
                                else{
                                    // @ts-ignore
                                    setSnackMessage("Código inválido");
                                }
                                setLoading(false);
                            }}>
                        Confirmar
                    </Button>
                </Grid>
                <Snackbar
                    visible={snackMessage !== null}
                    duration={3000}
                    onDismiss={() => setSnackMessage(null)}
                    text={snackMessage}
                />
            </Grid>
        </ScrollView>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        margin: 10,
    },
};
