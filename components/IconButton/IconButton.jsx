import { IconButton } from 'react-native-paper';

const IconButtonLocal = ({icon, size, onPress, style}) => {
    return <IconButton
            style={style}
            icon={icon}
            size={size}
            onPress={onPress}
        />
}

IconButtonLocal.defaultProps = {
    style: {}, 
    icon: "", 
    size: 20, 
    onPress: () => {}, 
}

export default IconButtonLocal;