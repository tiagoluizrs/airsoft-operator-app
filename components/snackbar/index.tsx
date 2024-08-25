import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar as Snack, SnackbarProps} from 'react-native-paper';

interface SnackbarProps {
    onDismiss?: void
}

const Snackbar = (props: SnackbarProps | any, children: any) => {
    return <Snack {...props}>{props.text}</Snack>
};

export default Snackbar;