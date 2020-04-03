import React, { memo } from "react";
import { MapPosition } from "./models/mapPosition";
import { Marker, Popup } from "react-leaflet";

export type MapMarkerProps = {
  position: MapPosition;
};

export const MapMarker: React.FC<MapMarkerProps> = memo((props) => {
  const { children, position } = props;

  return (
    <Marker position={[position.latitude, position.longitude]}>
      <Popup>{children}</Popup>
    </Marker>
  );
});
