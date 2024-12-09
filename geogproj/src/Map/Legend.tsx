import LegendBox  from './LegendBox';
import { calculateRedBlueIntervalColor } from '../Helpers/StyleHelper';



interface LegendProps {
    breaks: number[];
    breakSchema: string;
}


function Legend(props: LegendProps) {

    return (<div style={{
        width: "15%",
        display:'flex',
        flexDirection:'column-reverse',
        justifyContent: 'space-between',
    }}>
        {props.breaks.map((value, i) => <LegendBox
            // If the label corresponds to the whole numbrer divisor, don't label it as though it were a range
            label={(props.breakSchema == "Greatest Divisor" ? "" : "<= ") + value.toString()}
            color={calculateRedBlueIntervalColor(i,props.breaks.length-1,0)}
        />)}
    </div>);
}

export default Legend
