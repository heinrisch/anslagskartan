import React from "react";
import { AddressInput } from "../../../components/addressInput";
import { Address } from "../../../components/formAddressInput";
import { useHandleUpdateMapCenterCallback } from "../../../handlers/handleUpdateMapCenter";
import { AppContext } from "../../../state/appContext";
import { MapPosition } from "../models/mapPosition";

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
        placeholder="Sök på kartan"
        onChange={onChange}
        location={mapCenter}
        fullWidth
      />
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const SearchBar = SearchBarContainer;
