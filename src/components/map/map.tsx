import React, { memo, useState } from "react";
import { Map as LeafMap, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import * as firebase from "firebase/app";

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

  const pois = [
    [59.29374,18.05942],
    [59.29628,18.05375],
    [59.29102,18.05719],
    [59.30994,18.05736],
    [59.31134,18.05307],
    [59.33245,18.01567],
    [59.3335,18.02048],
    [59.33315,18.03731],
    [59.35512,17.94724],
    [59.40612,18.03671],
    [59.4042,18.04805],
    [59.40036,18.04564],
    [59.40542,18.02607],
    [59.36523,18.13665],
    [59.36925,18.14489],
    [59.33689,18.08754],
    [59.33706,18.08239],
    [59.33566,18.08548],
    [59.33531,18.09097],
    [59.33461,18.08445],
    [59.33584,18.0793]
  ];

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
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={defaultZoom}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={tileType}
        />
        <MarkerClusterGroup>
          { pois.map((locationFuckJs, index) => {
            return (
                <Marker position={[locationFuckJs[0], locationFuckJs[1]]}>
                <Popup>{index}</Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </LeafMap>
    </>
  );
});
