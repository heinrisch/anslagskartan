import { Post } from "../models/post";

export type AppAction =
  | { type: "POSTS_PENDING" }
  | { type: "POSTS_REJECTED" }
  | { type: "POSTS_RECEIVED"; payload: Post[] };
