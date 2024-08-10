import {AppBar, Menu} from "@/components";
import {useState} from "react";
import {router} from "expo-router";
import {useSession} from "@/app/ctx";

const Topbar = (props: any) => {
    const [visible, setVisible] = useState(false);
    const { signOut } = useSession();

    return  <>
                <AppBar
                    title={props.title}
                    icon={props.menu ? "dots-vertical" : ""}
                    back={props.back}
                    onPress={() => {
                        setVisible(!visible);
                    }}/>
                {
                    props.menu ? <Menu
                        visible={visible}
                        setVisible={setVisible}
                        items={[
                            {
                                leadingIcon:"account",
                                onPress: () => {
                                    router.push("/profile");
                                },
                                title: "Perfil"
                            },
                            {
                                leadingIcon:"cog",
                                onPress: () => {
                                    router.push("/settings");
                                },
                                title: "Configurações"
                            },
                            {
                                leadingIcon:"logout",
                                onPress: signOut,
                                title: "Sair"
                            },

                        ]}/> : null
                }
            </>
}

Topbar.defaultProps = {
    menu: true,
    back: null,
}

export default Topbar;