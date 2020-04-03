import React from "react";
import { Marker, Popup } from "react-leaflet";
import { MapPosition } from "./models/mapPosition";

export type MapMarkerProps = {
  position: MapPosition;
};

export const MapMarker: React.FC<MapMarkerProps> = React.memo((props) => {
  const { children, position } = props;

  return (
    <Marker position={[position.latitude, position.longitude]}>
      <Popup>{children}</Popup>
    </Marker>
  );
});
