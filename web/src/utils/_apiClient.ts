import {
  BackendPostResponse,
  BackendCreatePost,
  TaskResponse,
} from "../models/backendPost";

const host = "https://anslagskartans-backend.herokuapp.com";

export const apiClient = {
  ping: () => {
    return fetch(`${host}/ping`);
  },

  authPing: (userId: string) => {
    return fetch(`${host}/check-auth`, {
      headers: {
        idToken: userId,
      },
    });
  },

  fetchAllTask: (): Promise<BackendPostResponse> => {
    return fetch(`${host}/tasks`).then((response) => response.json());
  },

  createPost: async (
    userId: string,
    backendCreatePost: BackendCreatePost
  ): Promise<TaskResponse> => {
    return fetch(`${host}/tasks`, {
      method: "POST",
      body: JSON.stringify(backendCreatePost),
      headers: { idToken: userId },
    }).then((response) => response.json());
  },
};
