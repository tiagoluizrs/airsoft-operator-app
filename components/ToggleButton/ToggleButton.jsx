import { ToggleButton  } from 'react-native-paper';

const ToggleButtonLocal = ({icon, value, status, onPress, style}) => {
    return <ToggleButton
                icon={icon}
                value={value}
                status={status}
                onPress={onPress}
                style={style}
            />
}

ToggleButtonLocal.defaultProps = {
    icon: "", 
    value: null, 
    status: false, 
    onPress: () => {},
    style: {}
}


export default ToggleButtonLocal;