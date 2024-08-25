import {Appbar} from "react-native-paper";
import {router} from "expo-router";

const AppBar = (props: any) => {
    return <Appbar.Header>
        {
            props.back ? <Appbar.BackAction onPress={() => {
                if(props.backLink){
                    router.replace(props.backLink);
                }else{
                    router.back();
                }
            }} /> : null
        }
        <Appbar.Content {...props}/>
        { props.extraAction ? <Appbar.Action  {...props.extraAction} /> : null }
        <Appbar.Action
            {...props}
        />

    </Appbar.Header>
}

AppBar.defaultProps = {
    back: null,
    extraAction: null,
    backLink: null
}

export default AppBar;