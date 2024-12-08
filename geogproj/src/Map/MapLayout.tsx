import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';
import CountyBorders from '../assets/NebraskaCounties.json';
import populatePopulation from '../Helpers/CensusDataHelper';
import MapFrame from './MapFrame';
import Legend from './Legend';

function Map() {
    const [error, setError] = useState<string>(null);
    const [maxValue, setMaxValue] = useState<number | null>(null);
    const [minValue, setMinValue] = useState<number | null>(null);
    const [numberOfBreaks, setNumberOfBreaks] = useState<number>(5);
    const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);


    // Import the population data for each county, and link it to other county data
    useEffect(() => {
        const CountyData: FeatureCollection = CountyBorders as FeatureCollection;
        Promise.all(CountyData.features.map(populatePopulation)).then(results => {
            CountyData.features = results;
            setGeoJSON(CountyData);
            console.log(results);
        });
    }, []);


    //Once the data has been instantiated, get the high and low values
    useEffect(() => {
        if (geoJSON) {
            const lstPopulations: Array<number> = [];
            geoJSON.features.forEach((feature, index) => {
                lstPopulations[index] = feature.properties!.population;
            });
            const min = Math.min(...lstPopulations);
            const max = Math.max(...lstPopulations);
            if (max == min) {
                setError(`The maximum and minimum values are the same (${min}), data may not be compared.`);
            } else {
                setMinValue(min);
                setMaxValue(max);
            }
        }
    }, [geoJSON, setMaxValue, setMinValue]);


    //TODO: Loading
    return (
        <div style={{display:'flex'}}>
            <Legend
                minValue={minValue!}
                maxValue={maxValue!}
            />
            <MapFrame
                featureCollection={geoJSON!}
                minValue={minValue!}
                maxValue={maxValue!}
            />
        </div>
    )
}

export default Map
