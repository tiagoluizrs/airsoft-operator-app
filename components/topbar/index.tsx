import {AppBar, Menu} from "@/components";
import {useState} from "react";
import {router} from "expo-router";
import {useSession} from "@/app/ctx";
import {View} from "react-native";

const Topbar = (props: any) => {
    const [visible, setVisible] = useState(false);
    const { signOut } = useSession();

    return  <View style={{
        position: "absolute",
        width: "100%",
        zIndex: 1000
    }}>
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
                                onPress: () => {
                                    signOut();
                                    // @ts-ignore
                                    router.replace("/sign-in");
                                },
                                title: "Sair"
                            },

                        ]}/> : null
                }
            </View>
}

Topbar.defaultProps = {
    menu: true,
    back: null,
}

export default Topbar;