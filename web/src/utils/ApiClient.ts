import firebase from "firebase";
import { BackendPostResponse } from "../models/post";

export class ApiClient {

  host = "http://bimp.eu-west-1.elasticbeanstalk.com";

  get idToken(): Promise<string> {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      return currentUser.getIdToken(false);
    }
    return Promise.reject("not logged in");
  }

  ping() {
    return fetch(`${this.host}/ping`);
  }

  authPing() {
    return this.idToken.then((token) => fetch(`${this.host}/check-auth`, {
      headers: {
        'idToken': token
      },
    }));
  }

  allTask(): Promise<BackendPostResponse> {
    return fetch(`${this.host}/tasks`).then(response => response.json());
  }
}
