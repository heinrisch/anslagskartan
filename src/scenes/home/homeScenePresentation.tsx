import React, { memo } from "react";
import { Map } from "../../components/map/map";

export const HomeScenePresentation: React.FC = memo(() => {
  return (
    <Map
      defaultCenter={{ latitude: 59.310519, longitude: 18.057875 }}
      defaultZoom={13}
      markers={[]}
    />
  );
});
