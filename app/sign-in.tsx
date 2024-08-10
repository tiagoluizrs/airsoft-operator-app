import {Link, router} from 'expo-router';
import { ScrollView } from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import { useSession } from './ctx';
import {Avatar, Button, Grid, TextInput} from "@/components";
import {useState} from "react";

export default function SignIn() {
    const { signIn } = useSession();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                        }}>Entrar</Text>
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
                        <Button mode="contained" srtyle={{width: '100%'}}
                                style={{ backgroundColor: theme.colors.primary }}
                                onPress={() => {
                                    signIn();
                                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                                    // successful before navigating.
                                    router.replace('/');
                                }}>
                            Entrar
                        </Button>
                    </Grid>
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
