import React from "react";
import { Map } from "../../../../components/map/map";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MapMarker } from "../../../../components/map/mapMarker";
import { MapPosition } from "../../../../components/map/mapPosition";
import { Post } from "../../../../models/post";
import { AppContext } from "../../../../state/appContext";

// CONTAINER ----------------------------------------------------------------

const PostMapContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  return (
    <PostMapPresentation
      posts={state.posts}
      defaultCenter={state.mapCenter}
      defaultZoom={13}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type PostMapPresentationProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
  readonly posts: Post[];
};

const PostMapPresentation: React.FC<PostMapPresentationProps> = React.memo(
  (props) => {
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
      <Map defaultCenter={defaultCenter} defaultZoom={defaultZoom}>
        <MarkerClusterGroup>{renderedMarkers}</MarkerClusterGroup>
      </Map>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostMap = PostMapContainer;
