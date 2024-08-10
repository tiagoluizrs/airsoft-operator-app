// @ts-ignore
import {Topbar} from '@/components';
import {Redirect} from 'expo-router';

export default function NewAeg() {
    const logout = () => {
        return <Redirect href="/sign-in" />;
    }

    return (
        <Topbar
            title="Nova Aeg"
            back={true}
            menu={false}
        />
    );
}