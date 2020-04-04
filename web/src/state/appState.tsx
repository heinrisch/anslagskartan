import { Post } from "../models/post";

export const initialAppState: AppState = {
  posts: [],
  loadingPosts: false,
};

export type AppState = {
  posts: Post[];
  loadingPosts: boolean;
};
