import { Post } from "../../models/post";

export const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([]), 2000);
  });
};
