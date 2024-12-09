import 'leaflet/dist/leaflet.css';

function LoadingOverlay() {

    //TODO style with spinner
    return (
        <div style={{
            width: "100%",
            height: "100%",
            zIndex: 100,
            color: "black",
            opacity: 0.5
        }}>
            
        </div>
    )
}

export default LoadingOverlay
