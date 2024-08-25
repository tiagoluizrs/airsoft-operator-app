// @ts-nocheck
import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import {updateSession} from "@/services/profile";

const updateToken = async (refresh: string, attempts: number) => {
    try{
        const response = await fetch(`http://192.168.3.8:8000/api/api-token-refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refresh}),
        });

        const data = await response.json();
        if(data.access){
            return data.access;
        }
    }catch (err){
        console.error(err);
        if(attempts < 3){
            return await updateToken(token, attempts + 1);
        }
    }
    return null;
}

const verifyAndUpdateToken = async (token: string | null, refresh: string, attempts: number) => {
    if (token) {
        try{
            const response = await fetch(`http://192.168.3.8:8000/api/api-token-verify/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: token}),
            });
            if(response.status === 401){
                token = await updateToken(refresh, attempts);
            }
        }catch (err){
            console.log(err);
        }

        if (token) {
            if (Platform.OS === 'web') {
                const d: any = localStorage.getItem('session');
                const dataSession: any = JSON.parse(d);
                dataSession.access = token;
                try {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.setItem('session', dataSession);
                    }
                } catch (e) {
                    console.error('Local storage is unavailable:', e);
                }
            } else {
                const d: any = SecureStore.getItem('session');
                const dataSession: any = JSON.parse(d);
                dataSession.access = token;
                try {
                    await SecureStore.setItemAsync('session', JSON.stringify(dataSession));
                } catch (e) {
                    console.error('Secure store is unavailable:', e);
                }
            }
            return token;
        }
    }
    return null
}

const getAuthToken = async (key: string): Promise<string | null> => {
    let token: string | null = "";
    let refresh: string | null = "";

    if (Platform.OS === 'web') {
        try {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                const data: any = localStorage.getItem(key);
                if (data != null) {
                    token = data.access;
                    refresh = data.refresh
                }
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        try {
            const data: string | null = await SecureStore.getItemAsync(key);
            if (data != null) {
                const json: any = JSON.parse(data);
                token = json.access;
                refresh = json.refresh;
            }
        } catch (e) {
            console.error('Secure store is unavailable:', e);
        }
    }
    token = await verifyAndUpdateToken(token, refresh,1);

    if(token === null){
        router.replace("login");
        updateSession(null);
        return null;
    }
    return token;
}

const getHeaders = async (options: any) => {
    // @ts-ignore
    const token = await getAuthToken('session');
    console.log(token)
    if (options && Object.keys(options).length > 0) {
        return {
            ...options?.headers,
            'Authorization': token ? `Bearer ${token}` : undefined,
        };
    }
    return {
        'Authorization': token ? `Bearer ${token}` : undefined,
    };
}

const fetcher = async (url: string, options?: RequestInit) => {
    const headers = await getHeaders(options);

    const response = await fetch(`http://192.168.3.8:8000/api/${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export { fetcher, getHeaders }
