import React from "react";
import { AppContext } from "../state/appContext";
import { Address } from "../components/form/models/address";

export const useHandleUpdateMapCenterCallback = () => {
  const { dispatch } = React.useContext(AppContext);

  return React.useCallback(
    (address: Address) => {
      dispatch({ type: "UPDATE_MAP_CENTER", center: address });
    },
    [dispatch]
  );
};
