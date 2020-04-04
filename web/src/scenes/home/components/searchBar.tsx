import React from "react";
import { AppContext } from "../../../state/appContext";
import {
  AddressInput,
  Address,
} from "../../../components/addressInput/addressInput";

// CONTAINER ----------------------------------------------------------------

const SearchBarContainer: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);

  const handleChange = React.useCallback(
    (address: Address) => {
      dispatch({ type: "UPDATE_MAP_CENTER", center: address });
    },
    [dispatch]
  );

  return <SearchBarPresentation onChange={handleChange} />;
};

// PRESENTATION -------------------------------------------------------------

type SearchBarPresentationProps = {
  onChange: (address: Address) => void;
};

const SearchBarPresentation: React.FC<SearchBarPresentationProps> = React.memo(
  (props) => {
    const { onChange } = props;
    return <AddressInput label="Sök på kartan" value="" onChange={onChange} />;
  }
);

// EXPORT ------------------------------------------------------------------

export const SearchBar = SearchBarContainer;
