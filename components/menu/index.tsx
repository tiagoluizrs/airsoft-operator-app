import * as React from 'react';
import { View } from 'react-native';
import { Menu as Mn } from 'react-native-paper';

const Menu = (props: any) => {
    return props.visible ? <View style={{
                                flex: 1,
                                position: 'absolute',
                                right: 0,
                                top: 80,
                                backgroundColor: 'white',
                                zIndex: 1000,
                            }}>
                                {
                                    props.items ? props?.items?.map((item: any, index: number) => (
                                        <Mn.Item
                                            {...item}
                                            onPress={() => {
                                                item.onPress();
                                                props.setVisible(false);
                                            }}
                                        />
                                    )) : null
                                }
                            </View> : null;
};

Menu.defaultProps = {
    items: []
}

export default Menu;