import firebase from "firebase/app";
import React from "react";
import { FacebookUser } from "./../state/appState";
import { AppContext } from "../state/appContext";

export const useHandleUserSignInClickCallback = () => {
  const { dispatch } = React.useContext(AppContext);

  return React.useCallback(() => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
        const { credential, user } = result;
        const currentUser = firebase.auth().currentUser;
        const userId = await currentUser?.getIdToken(false);

        dispatch({ type: "SET_USER_ID", userId: userId || null });
        dispatch({
          type: "FACEBOOK_USER_SIGNED_IN",
          user: user as FacebookUser,
        });

        console.log("got credential", credential);
      })
      .catch((error) => {
        var { code, message, email, credential } = error;

        console.error("got error", code, message, email, credential, error);
      });
  }, [dispatch]);
};
