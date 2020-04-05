import React from "react";
import { AppAction } from "../state/appAction";
import { FacebookUser } from "../state/appState";

export const useHandleFacebookUserSignedInCallback = (
  dispatch: React.Dispatch<AppAction>
) => {
  return React.useCallback(
    (user: FacebookUser) => {
      dispatch({ type: "FACEBOOK_USER_SIGNED_IN", user });
    },
    [dispatch]
  );
};
