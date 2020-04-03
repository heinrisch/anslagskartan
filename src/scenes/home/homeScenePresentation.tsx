import React, { memo, useState } from "react";
import { Map } from "../../components/map/map";
import GMap from "../../Map";

export const HomeScenePresentation: React.FC = memo(() => {
  const [useGMaps, setUseGMaps] = useState(true);

  const renderedMap = useGMaps ? (
    <GMap />
  ) : (
    <Map defaultCenter={{ lat: 51.505, lng: -0.09 }} defaultZoom={13} />
  );

  return (
    <>
      <button onClick={() => setUseGMaps(!useGMaps)}>Switch Map</button>
      {renderedMap}
    </>
  );
});
