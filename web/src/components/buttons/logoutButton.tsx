import React from "react";
import firebase from "firebase/app";

export const LogoutButton: React.FC = React.memo(() => {
  const handleClick = () => firebase.auth().signOut();
  return <button onClick={handleClick}>Logga ut</button>;
});
