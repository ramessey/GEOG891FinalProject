import { calculateChoroplethStyle } from '../Helpers/StyleHelper';


interface LegendBoxProps {
    label: string;
    color: string;
}


function LegendBox(props: LegendBoxProps) {

    return (
        <div style={{
            height: "100%",
            outlineStyle: "solid",
            outlineWidth: "2px",
            outlineColor: "#fff",
            backgroundColor: props.color,
            fontWeight: 'bold',
            margin: "5px",
            alignContent: "center"
        }}>
            {props.label}
        </div>
    )
}

export default LegendBox
