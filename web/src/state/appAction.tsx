import { Post } from "../models/post";

export type AppAction =
  | { type: "POSTS_PENDING" }
  | { type: "POSTS_REJECTED" }
  | { type: "POSTS_RECEIVED"; payload: Post[] }
  | { type: "ADD_POST_PENDING" }
  | { type: "ADD_POST_REJECTED" }
  | { type: "ADD_POST_RECEIVED"; payload: Post };
