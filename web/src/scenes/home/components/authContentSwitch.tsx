import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { ChildFunction } from "@react-firebase/auth/dist/types";
import React from "react";
import { AppContext } from "../../../state/appContext";

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
    (user: unknown) => {
      dispatch({ type: "USER_SIGNED_IN", user });
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
  onUserSignedIn: (user: unknown) => void;
};

export const AuthContentSwitchPresentation: React.FC<AuthContentSwitchPresentationProps> = React.memo(
  (props) => {
    const {
      signedInContent: signedInElement,
      signedOutContent: signedOutElement,
    } = props;

    const renderMethod: ChildFunction = ({ isSignedIn, user, providerId }) => {
      console.log("facebook user", user);
      if (isSignedIn) {
        return signedInElement;
      }

      return signedOutElement;
    };

    return <FirebaseAuthConsumer>{renderMethod}</FirebaseAuthConsumer>;
  }
);

// EXPORT ------------------------------------------------------------------

export const AuthContentSwitch = AuthContentSwitchContainer;
