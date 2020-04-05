import firebase from "firebase";
import { BackendCreatePost, BackendPostResponse, TaskResponse } from "../models/post";

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
        "idToken": token,
      },
    }));
  }

  allTask(): Promise<BackendPostResponse> {
    return fetch(`${this.host}/tasks`).then(response => response.json());
  }

  async createPost(backendCreatePost: BackendCreatePost): Promise<TaskResponse> {
    const token = await this.idToken;
    const response = await fetch(`${this.host}/tasks`, {
      method: "POST",
      body: JSON.stringify(backendCreatePost),
      headers: {
        "idToken": token,
      }
    });
    return await response.json()
  }
}
