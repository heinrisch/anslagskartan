import { BackendCreatePost, TaskResponse } from "../../models/post";
import { ApiClient } from "../ApiClient";

const apiClient = new ApiClient();

export const addPosts = (
  userId: string,
  backendCreatePost: BackendCreatePost
): Promise<TaskResponse> => {
  return apiClient.createPost(userId, backendCreatePost);
};
