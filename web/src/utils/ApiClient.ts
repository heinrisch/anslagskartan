import firebase from "firebase";

export class ApiClient {

  host = "http://localhost:4021";

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
}
