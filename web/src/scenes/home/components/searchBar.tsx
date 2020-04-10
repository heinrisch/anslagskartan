import React from "react";
import { AddressInput } from "../../../components/form/addressInput";
import { useHandleUpdateMapCenterCallback } from "../../../handlers/handleUpdateMapCenter";
import { AppContext } from "../../../state/appContext";
import { MapPosition } from "../../../components/map/models/mapPosition";
import { Address } from "../../../components/form/models/address";

// CONTAINER ----------------------------------------------------------------

const SearchBarContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  const handleChange = useHandleUpdateMapCenterCallback();

  return <SearchBarPresentation onChange={handleChange} mapCenter={state.mapCenter} />;
};

// PRESENTATION -------------------------------------------------------------

type SearchBarPresentationProps = {
  readonly mapCenter: MapPosition;
  readonly onChange: (address: Address) => void;
};

const SearchBarPresentation: React.FC<SearchBarPresentationProps> = React.memo((props) => {
  const { onChange, mapCenter } = props;
  return (
    <AddressInput placeholder="Sök på kartan" onChange={onChange} location={mapCenter} fullWidth />
  );
});

// EXPORT ------------------------------------------------------------------

export const SearchBar = SearchBarContainer;
