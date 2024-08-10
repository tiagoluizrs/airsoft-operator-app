import {Button, Topbar} from "@/components";
import { useSession } from '../ctx';

export default function MyAegs() {
    const { signOut } = useSession();

    return <>
        <Topbar
            title="Minhas AEGs"
        />
        <Button
            onPress={() => {
                // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                signOut();
            }}>
            Sign Out
        </Button>
    </>
}
