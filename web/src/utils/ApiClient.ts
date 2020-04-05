import {
  BackendCreatePost,
  BackendPostResponse,
  TaskResponse,
} from "../models/post";

export class ApiClient {
  host = "https://anslagskartans-backend.herokuapp.com";

  ping() {
    return fetch(`${this.host}/ping`);
  }

  authPing(userId: string) {
    return fetch(`${this.host}/check-auth`, {
      headers: {
        idToken: userId,
      },
    });
  }

  allTask(): Promise<BackendPostResponse> {
    return fetch(`${this.host}/tasks`).then((response) => response.json());
  }

  async createPost(
    userId: string,
    backendCreatePost: BackendCreatePost
  ): Promise<TaskResponse> {
    const response = await fetch(`${this.host}/tasks`, {
      method: "POST",
      body: JSON.stringify(backendCreatePost),
      headers: { idToken: userId },
    });
    return await response.json();
  }
}
