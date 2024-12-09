import 'leaflet/dist/leaflet.css';
import Slider from '@mui/material/Slider';


interface LabeledSliderProps {
    label: string
    getter: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
    min: number;
    max: number;
    step: number;
}


function LabeledSlider(props: LabeledSliderProps) {

    const marks = [];
    let i = props.min;
    while (i <= props.max) {
        marks.push({
            value: i,
            label: i.toString(),
        })
        i += props.step;
    }


    return (
        <div style={{
            flexGrow: 2,
            padding: 20
        }}>
            <p  style={{fontWeight:'bold'}}>
                {props.label}
            </p>
            <Slider
                aria-label={props.label}
                defaultValue={props.getter}
                onChange={(e, value) => props.setter(value as number)}
                valueLabelDisplay="auto"
                shiftStep={props.step}
                step={props.step}
                marks={marks}
                min={props.min}
                max={props.max}
                sx={{
                    '& .MuiSlider-markLabel': {
                        color: 'white',
                    },
                }}
            />
        </div>
    )
}

export default LabeledSlider