import firebase from "firebase/app";
import React from "react";

export const useHandleUserSignInClickCallback = () => {
  return React.useCallback(() => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then((result) => {
        const { credential, user } = result;

        console.log("got credential", credential);
        console.log("got user", user);
      })
      .catch((error) => {
        var { code, message, email, credential } = error;

        console.error("got error", code, message, email, credential, error);
      });
  }, []);
};
