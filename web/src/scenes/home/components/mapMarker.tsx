import React from "react";
import { Marker, Popup } from "react-leaflet";
import { MapPosition } from "../models/mapPosition";

export type MapMarkerProps = {
  position: MapPosition;
  title: string;
};

export const MapMarker: React.FC<MapMarkerProps> = React.memo((props) => {
  const { children, position, title } = props;

  return (
    <Marker position={[position.latitude, position.longitude]} title={title}>
      <Popup>{children}</Popup>
    </Marker>
  );
});
