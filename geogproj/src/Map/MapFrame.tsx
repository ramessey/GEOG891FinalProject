import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { StyleFunction, Layer } from 'leaflet';
import type { FeatureCollection, Feature, GeoJsonObject } from 'geojson';
import { calculateChoroplethFillColor } from '../Helpers/StyleHelper';


interface MapFrameProps {
    featureCollection: FeatureCollection;
    breaks: number[];
    breakSchema: string;
}


function MapFrame(props: MapFrameProps) {


    const calculateStyle = ((feature: Feature) => {
        return {
            weight: 2,
            fillOpacity: 1,
            fillColor: calculateChoroplethFillColor(feature.properties!.population, props.breaks, props.breakSchema),
            color: 'white'
        }
        //return calculateChoroplethStyle(feature.properties, props.maxValue!, props.minValue!, popupFeature?.properties?.id);
    });


    const onEachFeature = ((feature: Feature, layer: Layer) => {
        layer.bindPopup(`${feature.properties!.name} County, population ${feature.properties!.population}`)
        //layer.on('click', () => { setPopupFeature(feature) });
    });


    return (
        <>
            <MapContainer
                style={{
                    width: "85%",
                    display: 'inline-block'
                }}
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
                    key={JSON.stringify(props.featureCollection)}
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
