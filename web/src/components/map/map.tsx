import React from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapMarker } from "./mapMarker";
import { MapPosition } from "./models/mapPosition";
import { TileType } from "./models/tileTypes";
import { Post } from "../../models/post";

type MapProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
  readonly markers: Post[];
};

export const Map: React.FC<MapProps> = React.memo((props) => {
  const { defaultCenter, defaultZoom, markers } = props;

  const renderedMarkers = markers.map((mark, index) => (
    <MapMarker position={mark.position} key={index}>
      {mark.name}
    </MapMarker>
  ));

  return (
    <>
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
