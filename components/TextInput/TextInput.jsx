import { TextInput  } from 'react-native-paper';

const TextInputLocal = ({style, mode, label, value, onFocus, secureTextEntry, onChangeText}) => {
    return <TextInput
            style={style}
            mode={mode}
            label={label}
            value={value}
            secureTextEntry={secureTextEntry}
            onFocus={text => onFocus(text)}
            onChangeText={text => onChangeText(text)}/>
}

TextInputLocal.defaultProps = {
    style: {}, 
    mode: "outlined", 
    label: "", 
    value: "", 
    secureTextEntry: false, 
    onFocus: () => {},
    onChangeText: () => {}
}

export default TextInputLocal;