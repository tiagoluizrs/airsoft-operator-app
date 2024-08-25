import {Checkbox, Grid} from "@/components";
import {useState} from "react";

// @ts-ignore
const ParentSearch = ({current, onDismiss, onPress}) => {
    const [selected, setSelected] = useState(current);

    const data = [
        {
            value: 1,
            label: "Capitão"
        },
        {
            value: 2,
            label: "Sub"
        },
        {
            value: 3,
            label: "Tenente"
        },
        {
            value: 4,
            label: "Sargento"
        },
        {
            value: 5,
            label: "Cabo"
        },
        {
            value: 6,
            label: "Soldado"
        },
        {
            value: 7,
            label: "Recruta"
        }
    ]
    return (
        <Grid>
            {
                data.map((item, index) => {
                    return <Checkbox status={selected === item.value ? "checked" : ""} value={item.value}
                                     label={item.label} onPress={() => onPress(item.value, item.label)}/>
                })
            }
        </Grid>
    )
}

export default ParentSearch;