import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import { HomeScene } from "./scenes/home/homeScene";
import { AppContext } from "./state/appContext";
import { initialAppState } from "./state/appState";
import { appStateReducer } from "./state/appStateReducer";
import { firebaseConfig } from "./utils/firebaseConfig";
import { fetchPosts } from "./utils/http/fetchPosts";

export const App: React.FC = React.memo(() => {
  const [state, dispatch] = React.useReducer(appStateReducer, initialAppState);

  React.useEffect(() => {
    dispatch({ type: "POSTS_PENDING" });
    fetchPosts()
      .then((posts) => dispatch({ type: "POSTS_RECEIVED", posts }))
      .catch(() => dispatch({ type: "POSTS_REJECTED" }));
  }, []);

  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <AppContext.Provider value={{ state, dispatch }}>
        <HomeScene />
      </AppContext.Provider>
    </FirebaseAuthProvider>
  );
});
