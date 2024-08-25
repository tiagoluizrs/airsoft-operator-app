import {Link, router} from 'expo-router';
import { ScrollView } from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import { useSession } from './ctx';
import {Avatar, Button, Grid, Snackbar, TextInput} from "@/components";
import {useState} from "react";

export default function SignIn() {
    const { signIn } = useSession();
    const theme = useTheme();
    const [snackMessage, setSnackMessage] = useState(null);
    const [username, setUsername] = useState('magrinho');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    return  <>
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
                            }}>Entrar</Text>
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                label="Email" />
                        </Grid>
                        <Grid style={{
                            ...styles.padding
                        }}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                label="Senha" secureTextEntry={true}/>
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
                            <Button mode="contained"
                                    loading={loading}
                                    style={{ backgroundColor: theme.colors.primary }}
                                    onPress={async () => {
                                        setLoading(true);
                                        const data = await signIn(username.toLowerCase(), password.toLowerCase());
                                        if (data.status === 200) {
                                            // @ts-ignore
                                            setSnackMessage("Seja bem vindo!!!");
                                            setTimeout(() => {
                                                router.replace("/");
                                            }, 2000)
                                        } else {
                                            if(data.data.email) {
                                                setSnackMessage(() => data.data.email[0]);
                                            }
                                            else if(data.data.username) {
                                                setSnackMessage(data.data.username[0]);
                                            }else {
                                                // @ts-ignore
                                                setSnackMessage("Erro ao logar!");
                                            }
                                        }
                                        setLoading(false);
                                    }}>
                                Entrar
                            </Button>
                        </Grid>
                    </Grid>
                </ScrollView>
                <Snackbar
                    visible={snackMessage !== null}
                    duration={2000}
                    onDismiss={() => setSnackMessage(null)}
                    text={snackMessage}
                />
            </>;
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
