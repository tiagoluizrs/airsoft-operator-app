import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";

const register = async (email: string, username: string, password: string) => {
    try {
        const response = await fetch('http://192.168.3.8:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password })
        });

        return {
            data: await response.json(),
            status: response.status
        };
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

const confirmEmail = async (email: string | string[], code: string) => {
    try {
        const response = await fetch('http://192.168.3.8:8000/api/confirm/code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code })
        });

        return {
            data: await response.json(),
            status: response.status
        };
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

const login = async (username: string, password: string) => {
    try {
        const response = await fetch('http://192.168.3.8:8000/api/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        return {
            data: await response.json(),
            status: response.status
        };
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

const getSession = async () => {
    if (Platform.OS === 'web') {
        try {
            const d: any = localStorage.getItem('session');
            return JSON.parse(d);
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        try {
            const d: any = SecureStore.getItem('session');
            return JSON.parse(d);
        } catch (e) {
            console.error('Secure store is unavailable:', e);
        }
    }
    return null;
}

export { getSession, register, confirmEmail, login };
