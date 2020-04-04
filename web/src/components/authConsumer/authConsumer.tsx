import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FacebookLoginButton } from "../buttons/facebookLoginButton";
import React from "react";
import { LoginInfo } from "./loginInfo";
import { ChildFunction } from "@react-firebase/auth/dist/types";

export const AuthConsumer: React.FC<{ className: string }> = React.memo(
  (props) => {
    const renderMethod: ChildFunction = ({ isSignedIn, user, providerId }) => {
      console.log("facebook user", user);
      if (isSignedIn)
        return (
          <LoginInfo
            className={props.className}
            displayName={user["displayName"]}
          />
        );
      return <FacebookLoginButton className={props.className} />;
    };

    return <FirebaseAuthConsumer>{renderMethod}</FirebaseAuthConsumer>;
  }
);
