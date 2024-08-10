import * as React from 'react';
import { Menu as Mn, Surface  } from 'react-native-paper';

const Menu = (props: any) => {
    return props.visible ? <Surface style={{
                                flex: 1,
                                position: 'absolute',
                                right: 20,
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
                            </Surface> : null;
};

Menu.defaultProps = {
    items: []
}

export default Menu;