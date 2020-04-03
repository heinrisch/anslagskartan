import React from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { AuthConsumer } from "../authConsumer/authConsumer";
import { MapMarker } from "./mapMarker";
import { hardCodedPositions } from "./models/hardCodedPositions";
import { MapPosition } from "./models/mapPosition";
import { TileType } from "./models/tileTypes";

type MapProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
  readonly markers: MapPosition[];
};

export const Map: React.FC<MapProps> = React.memo((props) => {
  const { defaultCenter, defaultZoom } = props;

  const renderedMarkers = hardCodedPositions.map((position) => (
    <MapMarker position={position}>{position.name}</MapMarker>
  ));

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "1rem",
          bottom: "1rem",
          zIndex: 1000,
        }}
      >
        <AuthConsumer />
      </div>
      <LeafMap
        center={[defaultCenter.latitude, defaultCenter.longitude]}
        zoom={defaultZoom}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={TileType.voyager}
        />
        <MarkerClusterGroup>{renderedMarkers}</MarkerClusterGroup>
      </LeafMap>
    </>
  );
});
