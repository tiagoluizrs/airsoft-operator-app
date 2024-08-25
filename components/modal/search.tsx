import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import {Button} from "@/components";

// @ts-ignore
const Search = ({ children, ...props }) => {
    const ContentComponent = props.content;

    return (
        <Portal>
            <Dialog visible={props.visible} {...props}>
                <Dialog.Title>{props.title}</Dialog.Title>
                <Dialog.Content>
                    {children}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={props.onDismiss}>Fechar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

Search.defaultProps = {
    hideDialog: () => {},
    visible: false,
}

export default Search;
