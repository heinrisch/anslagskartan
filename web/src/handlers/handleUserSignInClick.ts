import { FacebookUser } from "./../state/appState";
import firebase from "firebase/app";
import React from "react";
import { AppAction } from "../state/appAction";

export const useHandleUserSignInClickCallback = (
  dispatch: React.Dispatch<AppAction>
) => {
  return React.useCallback(() => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
        const { credential, user } = result;
        // const currentUser = firebase.auth().currentUser;
        // const userId = await currentUser?.getIdToken(false);

        // dispatch({ type: "SET_USER_ID", userId: userId || null });
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
    // .finally(() => {
    //   dispatch({ type: "LOGGED_IN_PROMISE" });
    // });
  }, [dispatch]);
};
