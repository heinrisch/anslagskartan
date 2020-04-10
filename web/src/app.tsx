import { FirebaseAuthProvider } from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import { HomeScene } from "./scenes/home/homeScene";
import { AppContext } from "./state/appContext";
import { initialAppState } from "./state/appState";
import { appStateReducer } from "./state/appStateReducer";
import { appConfig } from "./appConfig";

export const App: React.FC = React.memo(() => {
  const [state, dispatch] = React.useReducer(appStateReducer, initialAppState);

  return (
    <FirebaseAuthProvider firebase={firebase} {...appConfig.firebaseConfig}>
      <AppContext.Provider value={{ state, dispatch }}>
        <HomeScene />
      </AppContext.Provider>
    </FirebaseAuthProvider>
  );
});
