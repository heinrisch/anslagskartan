import React, { memo } from "react";
import { Map as LeafMap, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import * as firebase from "firebase/app";
import { MapMarker } from "./mapMarker";
import { hardCodedPositions } from "./models/hardCodedPositions";
import { MapPosition } from "./models/mapPosition";
import { TileType } from "./models/tileTypes";

type MapProps = {
  readonly defaultCenter: MapPosition;
  readonly defaultZoom: number;
  readonly markers: MapPosition[];
};

export const Map: React.FC<MapProps> = memo((props) => {
  const { defaultCenter, defaultZoom } = props;

  const renderedMarkers = hardCodedPositions.map((position, index) => (
    <MapMarker position={position}>{index}</MapMarker>
  ));
  const loginButton = (
      <button
          onClick={() => {
            const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(facebookAuthProvider).then(function(result) {
              const credential = result.credential;
              console.log('got credential', credential);
              const user = result.user;
              console.log('got user', user)
            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
              console.log('got error', errorCode, errorMessage, email, credential, error)
            });
          }}
      >
        Logga in med Ansiktsbok
      </button>
  );

  const logoutButton = (
      <button
          onClick={() => {
            firebase.auth().signOut();
          }}
      >
        Logga ut
      </button>
  );

  return (
    <>
      <div>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
                if(isSignedIn) {
                  return (<div>Inloggad som: {user['displayName']} {logoutButton}</div>);
                } else {
                  return (loginButton)
                }
        }}
      </FirebaseAuthConsumer>
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
