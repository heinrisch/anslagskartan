import React from "react";
import { Address } from "../components/form/formAddressInput";
import { AppContext } from "../state/appContext";

export const useHandleUpdateMapCenterCallback = () => {
  const { dispatch } = React.useContext(AppContext);

  return React.useCallback(
    (address: Address) => {
      dispatch({ type: "UPDATE_MAP_CENTER", center: address });
    },
    [dispatch]
  );
};
