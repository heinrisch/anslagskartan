import { postMapper } from "../../../models/postMapper";
import { appConfig } from "../../../appConfig";
import { FetchPostsResponse } from "../models/fetchPostsResponse";
import { restClient } from "../restClient";

export const fetchAllPosts = (userId?: string) =>
  restClient
    .get<FetchPostsResponse>(`${appConfig.apiBaseUrl}/tasks`, userId)
    .then((response) => response.data.tasks)
    .then((tasks) => tasks.map(postMapper.backendPostToFrontendPost));
