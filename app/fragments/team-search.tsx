import {Checkbox, Grid, List} from "@/components";
import { Searchbar } from 'react-native-paper';
import {useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/services/fetcher";
import {Text} from "react-native";

// @ts-ignore
const TeamSearch = ({current, onDismiss, onChange}) => {
    const [searchQuery, setSearchQuery] = useState('');
    // @ts-ignore
    const { data, error, isLoading } = useSWR(`team/?search=${searchQuery}&page_size=1`, fetcher)

    return (
        <Grid>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            {
                // @ts-ignore
                isLoading ? <Text>Carregando...</Text> : data && data.results.length > 0 ? data.results?.map(item => <List left={props => <Checkbox status={current === item.id ? "checked" : ""} value={item.id} label={item.name} onPress={() => onChange(item.id, item.name)}/>} />) : null
            }
        </Grid>
    )
}

export default TeamSearch;