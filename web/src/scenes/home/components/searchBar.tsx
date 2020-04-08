import React from "react";
import { AppContext } from "../../../state/appContext";
import { AddressInput, Address } from "../../../components/addressInput";
import { MapPosition } from "../models/mapPosition";
import { useHandleUpdateMapCenterCallback } from "../../../handlers/handleUpdateMapCenter";

// CONTAINER ----------------------------------------------------------------

const SearchBarContainer: React.FC = () => {
  const { dispatch, state } = React.useContext(AppContext);

  const handleChange = useHandleUpdateMapCenterCallback(dispatch);

  return (
    <SearchBarPresentation
      onChange={handleChange}
      mapCenter={state.mapCenter}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type SearchBarPresentationProps = {
  mapCenter: MapPosition;
  onChange: (address: Address) => void;
};

const SearchBarPresentation: React.FC<SearchBarPresentationProps> = React.memo(
  (props) => {
    const { onChange, mapCenter } = props;
    return (
      <AddressInput
        label="Sök på kartan"
        onChange={onChange}
        location={mapCenter}
        fullWidth
      />
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const SearchBar = SearchBarContainer;
