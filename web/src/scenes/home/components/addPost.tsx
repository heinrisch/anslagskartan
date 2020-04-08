import React from "react";
import "./addPost.css";
import { AddPostSignedInContent } from "./addPostSignedInContent";
import { AuthContentSwitch } from "./authContentSwitch";
import { FacebookSignInNotification } from "./facebookSignInNotification";

// PRESENTATION -------------------------------------------------------------

const AddPostPresentation: React.FC = React.memo(() => {
  const signedInContent = <AddPostSignedInContent />;
  const signedOutContent = <FacebookSignInNotification />;

  return (
    <AuthContentSwitch
      signedInContent={signedInContent}
      signedOutContent={signedInContent}
    />
  );
});

// EXPORT ------------------------------------------------------------------

export const AddPost = AddPostPresentation;
