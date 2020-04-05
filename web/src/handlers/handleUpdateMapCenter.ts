import React from "react";
import { AppAction } from "../state/appAction";
import { Address } from "../scenes/home/components/addressInput";

export const useHandleUpdateMapCenterCallback = (
  dispatch: React.Dispatch<AppAction>
) => {
  return React.useCallback(
    (address: Address) => {
      dispatch({ type: "UPDATE_MAP_CENTER", center: address });
    },
    [dispatch]
  );
};
