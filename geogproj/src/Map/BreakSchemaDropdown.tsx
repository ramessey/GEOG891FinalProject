import 'leaflet/dist/leaflet.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


interface BreakSchemaDropdownProps {
    breakSchema: string;
    setBreakSchema: React.Dispatch<React.SetStateAction<string>>;
}


function BreakSchemaDropdown(props: BreakSchemaDropdownProps) {

    return (
        <div style={{
            width: "12em",
            padding: 20
        }}>
            <p style={{ fontWeight: 'bold' }}>
                Schema
            </p>
            <Select
                style={{color:"white"}}
                sx={{
                    "& svg": {
                        color: "white",
                    },
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3277D5'
                    },
                }}
                fullWidth
                value={props.breakSchema}
                label="Schema"
                onChange={(e) => props.setBreakSchema(e.target.value as string)}
            >
                <MenuItem value={"Greatest Divisor"}>Greatest Divisor</MenuItem>
                <MenuItem value={"Equal Interval"}>Equal Interval</MenuItem>
                <MenuItem value={"Quintiles"}>Quintiles</MenuItem>
            </Select>
        </div>
    )
}

export default BreakSchemaDropdown