import 'leaflet/dist/leaflet.css';
import LabeledSlider from './LabeledSlider'


interface YearSliderProps {
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
}


function YearSlider(props: YearSliderProps) {

    return (
        <>
            <LabeledSlider
                label={"Year"}
                getter={props.year}
                setter={props.setYear}
                min={2015}
                max={2019}
                step={1}
            />
        </>
    )
}

export default YearSlider
