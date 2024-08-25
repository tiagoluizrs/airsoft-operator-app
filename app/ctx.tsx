import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import {login, register} from "@/services/auth";

import {FirebaseApp, initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBuIfBtmYBn-YrrOHDA-9X5dqmYm3s2C40",
    authDomain: "airsoft-operator-app-975e4.firebaseapp.com",
    databaseURL: 'https://airsoft-operator-app-975e4-default-rtdb.firebaseio.com',
    projectId: "airsoft-operator-app-975e4",
    storageBucket: "airsoft-operator-app-975e4.appspot.com",
    messagingSenderId: "768688944046",
    appId: "1:768688944046:web:c188c6f40a1a4fc2480e3f"
};

const firebaseApp = initializeApp(firebaseConfig);

const AuthContext = createContext<{
    signIn: (username: string, password: string) => Promise<RequestResponseInterface>;
    signUp: (email: string, username: string, password: string) => Promise<RequestResponseInterface>;
    signOut: () => void;
    firebaseApp?: FirebaseApp | null;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => ({ data: null, status: 200 }),
    signUp: async () => ({ data: null, status: 200 }),
    signOut: () => null,
    firebaseApp: firebaseApp,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: async (username: string, password: string): Promise<RequestResponseInterface> => {
                    const data = await login(username, password);
                    if(data){
                        setSession(JSON.stringify(data.data));
                        return data;
                    }
                    return { data: null, status: 500 };
                },
                signUp: async (email: string, username: string, password: string): Promise<RequestResponseInterface> => {
                    const data = await register(email, username, password);
                    if(data){
                        return data;
                    }
                    return { data: null, status: 500 };
                },
                signOut: () => {
                    setSession(null);
                },
                firebaseApp: firebaseApp,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    firebaseApp
}