import React from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapMarker } from "../../../components/map/mapMarker";
import { MapPosition } from "../../../components/map/models/mapPosition";
import { TileType } from "../../../components/map/models/tileTypes";
import { Post } from "../../../models/post";
import { AppContext } from "../../../state/appContext";

// CONTAINER ----------------------------------------------------------------

const MapContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  return (
    <MapPresentation
      posts={state.posts}
      defaultCenter={state.mapCenter}
      defaultZoom={13}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type MapPresentationProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
  readonly posts: Post[];
};

const MapPresentation: React.FC<MapPresentationProps> = React.memo((props) => {
  const { defaultCenter, defaultZoom, posts } = props;

  const renderedMarkers = posts.map((post, index) => (
    <MapMarker position={post.position} key={index} title={post.title}>
      <div>
        <strong>{post.title}</strong>
      </div>
      <p>{post.description}</p>
      <i>{post.address}</i>
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

// EXPORT ------------------------------------------------------------------

export const Map = MapContainer;
