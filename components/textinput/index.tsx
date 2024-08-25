import * as React from 'react';
import { TextInput as TIp, TextInputProps } from 'react-native-paper';

const TextInput = (props: any) => {
    return props.icon ? <TIp {...props} right={<TIp.Icon {...props} onPress={props.iconPress}/>} /> : <TIp {...props} />
};

TextInput.defaultProps = {
    icon: null,
}

export default TextInput;