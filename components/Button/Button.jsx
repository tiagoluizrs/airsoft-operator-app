import { Button  } from 'react-native-paper';

const ButtonLocal = ({style, mode, onPress, label}) => {
    return <Button style={style} mode={mode} onPress={onPress}>{label}</Button>
}

ButtonLocal.defaultProps = {
    style: {}, 
    mode: "", 
    label: "", 
    onPress: () => {}
}


export default ButtonLocal;