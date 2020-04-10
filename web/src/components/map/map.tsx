import React from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import { MapPosition } from "./mapPosition";
import { TileType } from "./mapTileType";

type MapPresentationProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
};

export const Map: React.FC<MapPresentationProps> = React.memo((props) => {
  const { defaultCenter, defaultZoom, children } = props;

  return (
    <LeafMap
      center={[defaultCenter.latitude, defaultCenter.longitude]}
      zoom={defaultZoom}
      style={{ width: "100%", height: "100vh" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={TileType.voyager}
      />
      {children}
    </LeafMap>
  );
});
