import firebase from "firebase";
import React from "react";
import { AppContext } from "../state/appContext";
import { FacebookUser } from "../state/appState";

export const useHandleFacebookUserSignedInCallback = () => {
  const { dispatch } = React.useContext(AppContext);

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
