import {Button, Topbar} from "@/components";
import { useSession } from '../ctx';

export default function RatingAeg() {
    const { signOut } = useSession();

    return <>
        <Topbar
            title="Avaliar"
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
