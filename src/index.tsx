import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HomeScenePresentation } from './scenes/home/homeScenePresentation';
import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider} from "@react-firebase/auth";

const config = {
    apiKey: "AIzaSyDSVpAgrUGOtfXydlsEnlDKSES8XFwDEsM",
    projectId: "billboard-map-273108",
    databaseURL: "DATABASE_URL",
    authDomain: "billboard-map-273108.firebaseapp.com",
};

ReactDOM.render(
  <React.StrictMode>
      <FirebaseAuthProvider firebase={firebase} {...config}>
          <HomeScenePresentation />
      </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
