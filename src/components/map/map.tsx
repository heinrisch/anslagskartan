import React, { memo } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

type MapProps = {
  readonly defaultCenter: {
    readonly lat: number;
    readonly lng: number;
  };
  readonly defaultZoom: number;
};

export const Map: React.FC<MapProps> = memo((props) => {
  const { defaultCenter, defaultZoom } = props;

  return (
    <LeafMap
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={defaultZoom}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <Marker position={[defaultCenter.lat, defaultCenter.lng]}>
          <Popup>1</Popup>
        </Marker>
        <Marker position={[defaultCenter.lat - 1, defaultCenter.lng - 1]}>
          <Popup>2</Popup>
        </Marker>
        <Marker position={[defaultCenter.lat + 1, defaultCenter.lng + 1]}>
          <Popup>3</Popup>
        </Marker>
      </MarkerClusterGroup>
    </LeafMap>
  );
});
