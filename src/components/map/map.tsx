import React, { memo, useState } from "react";
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
  const [tileType, setTileType] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  const handleChange = (event: any) => {
    setTileType(event.target.value);
  };

  return (
    <>
      <select onChange={handleChange}>
        <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
          default
        </option>
        <option value="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png">
          alidade
        </option>
        <option value="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png">
          osm
        </option>
        <option value="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png">
          hydda
        </option>
        <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}">
          worldStreet
        </option>
        <option value="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}">
          worldTopo
        </option>
        <option value="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png">
          voyager
        </option>
      </select>

      <LeafMap
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={defaultZoom}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileType}
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
    </>
  );
});
