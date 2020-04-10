import { ping } from "./endpoints/ping";
import { authPing } from "./endpoints/authPing";
import { createPost } from "./endpoints/createPost";
import { fetchAllPosts } from "./endpoints/fetchAllPosts";

export const apiClient = {
  authPing,
  createPost,
  fetchAllPosts,
  ping,
};
