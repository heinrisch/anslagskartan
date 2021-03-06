import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { ChildFunction } from "@react-firebase/auth/dist/types";
import React from "react";
import { AppContext } from "../../../state/appContext";
import { FacebookUser } from "../../../state/appState";
import { useHandleFacebookUserSignedInCallback } from "../../../handlers/handleFacebookUserSignedIn";

// CONTAINER ----------------------------------------------------------------

type AuthContentSwitchContainerProps = {
  readonly signedInContent: JSX.Element;
  readonly signedOutContent: JSX.Element;
};

const AuthContentSwitchContainer: React.FC<AuthContentSwitchContainerProps> = (props) => {
  const { state } = React.useContext(AppContext);

  const handleUserSignedIn = useHandleFacebookUserSignedInCallback();

  if (state.doNotCheckLogin) {
    return props.signedInContent;
  }

  return <AuthContentSwitchPresentation onUserSignedIn={handleUserSignedIn} {...props} />;
};

// PRESENTATION -------------------------------------------------------------

type AuthContentSwitchPresentationProps = {
  readonly signedInContent: JSX.Element;
  readonly signedOutContent: JSX.Element;
  readonly onUserSignedIn: (user: FacebookUser) => void;
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
