import { Post } from "../../models/post";
import { postMapper } from "./../../models/postMapper";
import { apiClient } from "../_apiClient";

export const fetchPosts = (): Promise<Post[]> => {
  return apiClient
    .fetchAllTask()
    .then((response) => response.tasks.map(postMapper.toFrontendPost));
};
