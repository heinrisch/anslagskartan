import React from "react";
import { AppContext } from "../../../state/appContext";
import {
  AddressInput,
  Address,
} from "../../../components/addressInput/addressInput";
import { MapPosition } from "../../../components/map/models/mapPosition";

// CONTAINER ----------------------------------------------------------------

const SearchBarContainer: React.FC = () => {
  const { dispatch, state } = React.useContext(AppContext);

  const handleChange = React.useCallback(
    (address: Address) => {
      dispatch({ type: "UPDATE_MAP_CENTER", center: address });
    },
    [dispatch]
  );

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
      />
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const SearchBar = SearchBarContainer;
