import { useEffect, useState } from "react";
import Search from "../Search/Search"
import { List, Text, useTheme } from 'react-native-paper';
import { get } from "../../util/request";
import { View } from "react-native";

const TeamSelect = ({ onPress, queryText }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState(queryText);
    const [items, setItems] = useState([]);

    const searchItems = async () => {
        if(searchQuery === ""){
            setItems([])
        }else{
            const response = await get('team', {}, {
                search: searchQuery
            }, true);
            setItems(response.data)
        }
    }
    useEffect(() => {
        searchItems();
    }, [searchQuery])

    return <View
                style={{
                alignSelf: "stretch",
                // justifyContent: "center",
                // alignItems: "center",
                height: "100%",
                padding: 5,
                backgroundColor: theme.colors.bgColor
                }}
            >
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Buscar equipe"}/>
            {
                items?.map((item, key) => <List.Item key={key}
                        onPress={() => onPress(item)}
                        title={item.name}
                        left={props => <List.Image 
                                            style={{
                                                backgroundColor: theme.colors.bgColor
                                            }}
                                            variant="image" source={{uri: item.image}} />}
                    />)
            }
           </View>
}

TeamSelect.defaultProps = {
    queryText: ""
}

export default TeamSelect;