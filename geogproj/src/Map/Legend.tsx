import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';


interface LegendProps {
    maxValue: number;
    minValue: number;
}


function MapFrame(props: LegendProps) {

    return (
        <div style={{
            backgroundImage: 'linear-gradient(#ff0000,#0000ff)',
            height: '70vh',
            width: '10vw',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'space-between',
            fontWeight: 'bold'
        }}>
            <p>
                {`${props.maxValue} yrs`}
            </p>
            <p>
                {`${props.minValue} yrs`}
            </p>
        </div>
    )
}

export default MapFrame
