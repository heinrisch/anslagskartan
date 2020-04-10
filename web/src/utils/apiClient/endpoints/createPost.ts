import { appConfig } from "../../../appConfig";
import { CreatePostRequest } from "../models/createPostRequest";
import { CreatePostResponse } from "../models/createPostResponse";
import { restClient } from "../restClient";

export const createPost = (post: CreatePostRequest, userId?: string) =>
  restClient
    .post<CreatePostResponse>(`${appConfig.apiBaseUrl}/tasks`, post, userId)
    .then((response) => response.data.taskId);
