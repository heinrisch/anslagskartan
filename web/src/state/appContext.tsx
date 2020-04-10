import React from "react";
import { AppState, initialAppState } from "./appState";
import { AppAction } from "./appAction";

export type AppDispatch = React.Dispatch<AppAction>;

export const initialContext: {
  state: AppState;
  dispatch: AppDispatch;
} = {
  state: initialAppState,
  dispatch: () => "",
};

export const AppContext = React.createContext(initialContext);
