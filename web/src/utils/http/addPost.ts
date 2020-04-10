import { BackendCreatePost, TaskResponse } from "../../models/backendPost";
import { apiClient } from "../_apiClient";

export const addPosts = (
  userId: string,
  post: BackendCreatePost
): Promise<TaskResponse> => {
  return apiClient.createPost(userId, post);
};
