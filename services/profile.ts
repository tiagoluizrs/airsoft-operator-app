import {getHeaders} from "@/services/fetcher";
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";

const fields: any = {
    'first_name': 'Nome',
    'last_name': 'Sobrenome',
    'email': 'Email',
}

const updateSessionProfile = async (data: any) => {
    if (Platform.OS === 'web') {
        try {
            const d: any = localStorage.getItem('session');
            const dataProfile: any = JSON.parse(d);
            dataProfile.profile = {
                ...dataProfile.profile,
                ...data
            };
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                localStorage.setItem('session', JSON.stringify(dataProfile));
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        try {
            const d: any = SecureStore.getItem('session');
            const dataProfile: any = JSON.parse(d);
            dataProfile.profile = {
                ...dataProfile.profile,
                ...data
            };
            await SecureStore.setItemAsync('session', JSON.stringify(dataProfile));
        } catch (e) {
            console.error('Secure store is unavailable:', e);
        }
    }
}

const updateUser = async (id: string, data: any) => {
    const headers = await getHeaders({
        'headers': {
            'Content-Type': 'application/json'
        }
    });

    const response = await fetch(`http://192.168.3.8:8000/api/profile/${id}/`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    });

    data = await response.json();
    if(response.status === 200) {
        await updateSessionProfile(data);
        return {
            message: "Usuário atualizado com sucesso",
            data
        }
    }else{
        const user = data.user;
        let message = "";

        for(let key in data) {
            if(key === 'user') {
                for(let j in user) {
                    message += `${fields[j]}: ${user[j]}\n`;
                }
            } else {
                message += `${fields[key]}: ${data[key]}\n`;
            }
        }

        return {
            message: message,
            data: null
        }
    }
}

export {
    updateUser,
    updateSessionProfile
}