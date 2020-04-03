import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FacebookLoginButton } from "../buttons/facebookLoginButton";
import React from "react";
import { LoginInfo } from "./loginInfo";
import { ChildFunction } from "@react-firebase/auth/dist/types";

export const AuthConsumer: React.FC = React.memo(() => {
  const renderMethod: ChildFunction = ({ isSignedIn, user, providerId }) => {
    if (isSignedIn) return <LoginInfo displayName={user["displayName"]} />;
    return <FacebookLoginButton />;
  };

  return <FirebaseAuthConsumer>{renderMethod}</FirebaseAuthConsumer>;
});
