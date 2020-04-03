import React from "react";
import GoogleMapReact from "google-map-react";
import { MapMarker } from "./googleMapMarker";

interface GMapProps {}

export const GMap: React.FC<GMapProps> = (props) => {
  const defaultProps = {
    center: {
      lat: 59.310519,
      lng: 18.057875,
    },
    zoom: 10,
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDSVpAgrUGOtfXydlsEnlDKSES8XFwDEsM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker lat={59.310519} lng={18.057875} text="Södersjukhuset" />

        <MapMarker lat={59.334785} lng={18.02106} text="St Görans" />
      </GoogleMapReact>
    </div>
  );
};

export default GMap;
