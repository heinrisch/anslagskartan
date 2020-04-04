import firebase from "firebase/app";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

export const FacebookLoginButton: React.FC<{ className: string }> = React.memo(
  (props) => {
    const handleClick = () => {
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
    };

    return (
      <FontAwesomeIcon
        className={props.className}
        size="2x"
        icon={faFacebookSquare}
        onClick={handleClick}
        style={{ color: "#4267B2", cursor: "pointer" }}
        title="Sign in with Facebook"
      />
    );
  }
);
