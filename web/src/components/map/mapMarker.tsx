import React from "react";
import { Marker, Popup } from "react-leaflet";
import { MapPosition } from "./models/mapPosition";

// PRESENTATION -------------------------------------------------------------

type MapMarkerPresentationProps = {
  readonly position: MapPosition;
  readonly title: string;
};

const MapMarkerPresentation: React.FC<MapMarkerPresentationProps> = React.memo((props) => {
  const { children, position, title } = props;

  return (
    <Marker position={[position.latitude, position.longitude]} title={title}>
      <Popup>{children}</Popup>
    </Marker>
  );
});

// EXPORT ------------------------------------------------------------------

export const MapMarker = MapMarkerPresentation;
