import {Topbar} from '@/components';
import {Redirect} from 'expo-router';

export default function SettingsScreen() {
    const logout = () => {
        return <Redirect href="/sign-in" />;
    }

    return (
        <Topbar
            title="Configurações"
            back={true}
            menu={false}
        />
    );
}