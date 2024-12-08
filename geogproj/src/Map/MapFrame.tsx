import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { StyleFunction, Layer } from 'leaflet';
import type { FeatureCollection, Feature, GeoJsonObject } from 'geojson';
import calculateChoroplethStyle from '../Helpers/StyleHelper';


interface MapFrameProps {
    featureCollection: FeatureCollection;
    maxValue: number;
    minValue: number;
}


function MapFrame(props: MapFrameProps) {
    const [popupFeature, setPopupFeature] = useState<Feature | null>(null);


    const calculateStyle = ((feature: Feature) => {
        return calculateChoroplethStyle(feature.properties, props.maxValue!, props.minValue!, popupFeature?.properties?.id);
    });


    const onEachFeature = ((feature: Feature, layer: Layer) => {
        //if (feature.properties) {
        layer.bindPopup(`${feature.properties!.name} County, population ${feature.properties!.population}`)
        //}
        layer.on('click', () => { setPopupFeature(feature) });
        //layer.on
        //    ({
        //       click: setPopupFeature(popupFeature)
        //    //mouseover: onMouseOver,
        //    //mouseout: onMouseOut,
        //});
    });


    return (
        <>
            <MapContainer
                style={{ width: '70vw', height: '70vh', display: 'inline-block' }}
                center={{ lat: 41.5, lng: -100 }}
                zoom={7}
                doubleClickZoom={false}
                closePopupOnClick= {false}
                dragging= {false}
                trackResize= {false}
                touchZoom= {false}
                scrollWheelZoom= {false}
            >
                <TileLayer
                    attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    key={`${popupFeature?.id}|${JSON.stringify(props.featureCollection)}`}
                    data={props.featureCollection as GeoJsonObject}
                    style={calculateStyle as StyleFunction}
                    onEachFeature={(feature, layer) => onEachFeature(feature,layer)}
                >
                </GeoJSON>
            </MapContainer>
        </>
    )
}

export default MapFrame
