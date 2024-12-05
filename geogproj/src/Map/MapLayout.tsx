import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import type { FeatureCollection } from 'geojson';
import CountyBorders from '../assets/NebraskaCounties.json';
import calculateChoroplethStyle from '../Helpers/StyleHelper';
import populatePopulation from '../Helpers/CensusDataHelper';

function Map() {
    const [error, setError] = useState<string>(null);
    const [maxValue, setMaxValue] = useState<number | null>(null);
    const [minValue, setMinValue] = useState<number | null>(null);
    const [numberOfBreaks, setNumberOfBreaks] = useState<number>(5);
    const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);
    const [data, setData] = useState(null);


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


    const calculateStyle = (feature => {
        return calculateChoroplethStyle(feature.properties.population, maxValue, minValue);
    });

    //TODO: Loading
    return (
        <>
            <MapContainer
                style={{ width: '90vw', height: '90vh' }}
                center={{ lat: 41.5, lng: -100 }}
                zoom={7}
            >
                <TileLayer
                    attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    key={JSON.stringify(geoJSON)}
                    data={geoJSON}
                    style={calculateStyle}
                >
                </GeoJSON>
            </MapContainer>
        </>
    )
}

export default Map
