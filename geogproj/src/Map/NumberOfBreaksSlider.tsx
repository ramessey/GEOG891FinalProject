import 'leaflet/dist/leaflet.css';
import LabeledSlider from './LabeledSlider'


interface NumberOfBreaksSliderProps {
    numberOfBreaks: number;
    setNumberOfBreaks: React.Dispatch<React.SetStateAction<number>>;
}


function NumberOfBreaksSlider(props: NumberOfBreaksSliderProps) {

    return (
        <>
            <LabeledSlider
                label={"Number Of Breaks"}
                getter={props.numberOfBreaks}
                setter={props.setNumberOfBreaks}
                min={2}
                max={8}
                step={1}
            />
        </>
    )
}

export default NumberOfBreaksSlider
