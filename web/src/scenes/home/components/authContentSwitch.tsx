import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { ChildFunction } from "@react-firebase/auth/dist/types";
import React from "react";
import { AppContext } from "../../../state/appContext";
import { FacebookUser } from "../../../state/appState";

// CONTAINER ----------------------------------------------------------------

type AuthContentSwitchContainerProps = {
  signedInContent: JSX.Element;
  signedOutContent: JSX.Element;
};

const AuthContentSwitchContainer: React.FC<AuthContentSwitchContainerProps> = (
  props
) => {
  const { dispatch } = React.useContext(AppContext);

  const handleUserSignedIn = React.useCallback(
    (user: FacebookUser) => {
      dispatch({ type: "FACEBOOK_USER_SIGNED_IN", user });
    },
    [dispatch]
  );

  return (
    <AuthContentSwitchPresentation
      onUserSignedIn={handleUserSignedIn}
      {...props}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type AuthContentSwitchPresentationProps = {
  signedInContent: JSX.Element;
  signedOutContent: JSX.Element;
  onUserSignedIn: (user: FacebookUser) => void;
};

export const AuthContentSwitchPresentation: React.FC<AuthContentSwitchPresentationProps> = React.memo(
  (props) => {
    const { onUserSignedIn, signedInContent, signedOutContent } = props;

    const renderMethod: ChildFunction = ({ isSignedIn, user, providerId }) => {
      if (isSignedIn) {
        onUserSignedIn(user);
        return signedInContent;
      }

      return signedOutContent;
    };

    return <FirebaseAuthConsumer>{renderMethod}</FirebaseAuthConsumer>;
  }
);

// EXPORT ------------------------------------------------------------------

export const AuthContentSwitch = AuthContentSwitchContainer;
