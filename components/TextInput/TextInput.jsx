import { TextInput  } from 'react-native-paper';

const TextInputLocal = ({style, mode, label, value, secureTextEntry, onChangeText}) => {
    return <TextInput
            style={style}
            mode={mode}
            label={label}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={text => onChangeText(text)}/>
}

TextInputLocal.defaultProps = {
    style: {}, 
    mode: "outlined", 
    label: "", 
    value: "", 
    secureTextEntry: false, 
    onChangeText: () => {}
}

export default TextInputLocal;