import { Post } from "../../models/post";

export const addPosts = (post: Post): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...post, id: Math.random() }), 2000);
  });
};
