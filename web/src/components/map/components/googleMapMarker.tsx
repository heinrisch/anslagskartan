import * as React from "react";

interface MapMarkerProps {
    text: string,
    lat: number,
    lng: number,
}

export const MapMarker: React.FC<MapMarkerProps> = (props) => {
    return (
        <div style={{color: 'red'}}>
            {props.text}
        </div>
    );
};
