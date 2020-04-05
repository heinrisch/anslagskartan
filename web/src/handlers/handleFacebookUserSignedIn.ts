import React from "react";
import { AppAction } from "../state/appAction";
import { FacebookUser } from "../state/appState";
import firebase from "firebase";

export const useHandleFacebookUserSignedInCallback = (
  dispatch: React.Dispatch<AppAction>
) => {
  return React.useCallback(
    async (user: FacebookUser) => {
      const currentUser = firebase.auth().currentUser;
      const userId = await currentUser?.getIdToken(false);

      dispatch({ type: "FACEBOOK_USER_SIGNED_IN", user });
      dispatch({ type: "SET_USER_ID", userId: userId || null });
    },
    [dispatch]
  );
};
