import {Link, router} from 'expo-router';
import { ScrollView } from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import { useSession } from './ctx';
import {Avatar, Button, Grid, Snackbar, TextInput} from "@/components";
import {useState} from "react";

export default function SignUp() {
    const { signUp } = useSession();
    const theme = useTheme();
    const [snackMessage, setSnackMessage] = useState(null);

    const [email, setEmail] = useState('tiagoluizribeirodasilva@gmail.com');
    const [username, setUsername] = useState('magrinho');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

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
                    }}>Registrar</Text>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={email}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        label="Email" />
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <TextInput
                        value={username}
                        keyboardType="default"
                        onChangeText={setUsername}
                        label="Usuário" />
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
                    <Link href="/sign-in" style={{
                        textAlign: 'center',
                        textDecorationLine: 'underline'
                    }}>Fazer Login</Link>
                </Grid>
                <Grid style={{
                    ...styles.padding
                }}>
                    <Button
                            loading={loading}
                            mode="contained" srtyle={{width: '100%'}}
                            style={{ backgroundColor: theme.colors.primary }}
                            onPress={async () => {
                                setLoading(true);
                                const data = await signUp(email.toLowerCase(), username.toLowerCase(), password.toLowerCase());
                                if (data.status === 201) {
                                    // @ts-ignore
                                    setSnackMessage("Usuário cadastrado com sucesso! Confirme seu e-mail a seguir.");
                                    setTimeout(() => {
                                        router.push({ pathname: `/confirm`, params: { email } });
                                    }, 3000)
                                } else {
                                    if(data.data.email) {
                                        setSnackMessage(() => data.data.email[0]);
                                    }
                                    else if(data.data.username) {
                                        setSnackMessage(data.data.username[0]);
                                    }else {
                                        // @ts-ignore
                                        setSnackMessage("Erro ao cadastrar usuário!");
                                    }
                                }
                                setLoading(false);
                            }}>
                        Cadastrar
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
