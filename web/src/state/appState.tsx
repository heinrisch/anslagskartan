import { Post } from "../models/post";

export const initialAppState: AppState = {
  posts: [],
  loadingPosts: false,
  loadingAddPost: false,
};

export type AppState = {
  posts: Post[];
  loadingPosts: boolean;
  loadingAddPost: boolean;
};
