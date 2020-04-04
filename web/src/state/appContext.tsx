import React from "react";
import { AppState, initialAppState } from "./appState";
import { AppAction } from "./appAction";

export const initialContext: {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} = {
  state: initialAppState,
  dispatch: () => "",
};

export const AppContext = React.createContext(initialContext);
