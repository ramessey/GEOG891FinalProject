import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react'
import type { FeatureCollection } from 'geojson';
import CountyBorders from '../assets/NebraskaCounties.json';
import populatePopulation from '../Helpers/CensusDataHelper';
import calculateBreaks from '../Helpers/BreakHelper';
import MapFrame from './MapFrame';
import Legend from './Legend';
import NumberOfBreaksSlider from './NumberOfBreaksSlider';
import YearSlider from './YearSlider';
import BreakSchemaDropdown from './BreakSchemaDropdown';

function Map() {
    const [loading, setLoading] = useState<boolean>(false);
    const [numberOfBreaks, setNumberOfBreaks] = useState<number>(5);
    const [year, setYear] = useState<number>(2017);
    const [breakSchema, setBreakSchema] = useState<string>("Equal Interval");
    const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);
    const [breaks, setBreaks] = useState<number[]>([]);


    // Import the population data for each county, and link it to other county data
    useEffect(() => {
        setLoading(true);
        const CountyData: FeatureCollection = CountyBorders as FeatureCollection;
        Promise.all(CountyData.features.map((feature) => populatePopulation(feature, year))).then(results => {
            CountyData.features = results;
            setGeoJSON(CountyData);
            const newBreaks = calculateBreaks(geoJSON, breakSchema, numberOfBreaks);
            setBreaks(newBreaks as number[]);
            setLoading(false);
            console.log(results);
        });
    }, [year]);


    //Once the data has been instantiated, calculate the breaks, and recalculate when the break schema changes
    useEffect(() => {
        const newBreaks = calculateBreaks(geoJSON, breakSchema, numberOfBreaks);
        setBreaks(newBreaks as number[]);
    }, [geoJSON, breakSchema, numberOfBreaks]);



    return (
        <div style={{
            width: "80vw",
            height: "100vh"
        }}>
            <p style={{
                fontWeight: "bold",
                fontSize: "2em",
                width: "100%",
                justifyContent: "center",
                margin: 0
            }}>
                Census Population Data
            </p>
            <div style={{ display: 'flex' }}>
                <YearSlider
                    year={year}
                    setYear={setYear}
                />
                <NumberOfBreaksSlider
                    numberOfBreaks={numberOfBreaks}
                    setNumberOfBreaks={setNumberOfBreaks}
                />
                <BreakSchemaDropdown
                    breakSchema={breakSchema}
                    setBreakSchema={setBreakSchema}
                />
            </div>
            <div style={{
                display: 'flex',
                height: "70%",
                opacity: loading ? 0.5 : 1
            }}>
                <Legend
                    breaks={breaks!}
                    breakSchema={breakSchema}
                />
                <MapFrame
                    featureCollection={geoJSON!}
                    breaks={breaks!}
                    breakSchema={breakSchema}
                />
            </div>
        </div>
    )
}

export default Map
