import { Switch  } from 'react-native-paper';

const SwitchLocal = ({value, onValueChange, style}) => {
    return <Switch value={value} onValueChange={onValueChange} style={style}/>
}

SwitchLocal.defaultProps = {
    value: null, 
    onValueChange: () => {}, 
    style: {}, 
}


export default SwitchLocal;