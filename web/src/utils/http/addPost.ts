import { BackendCreatePost, TaskResponse } from "../../models/post";
import { ApiClient } from "../ApiClient";

const apiClient = new ApiClient();

export const addPosts = (backendCreatePost: BackendCreatePost): Promise<TaskResponse> => {
  return apiClient.createPost(backendCreatePost);
};
