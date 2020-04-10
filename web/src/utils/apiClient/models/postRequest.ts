import { PostDataResponse, PostResponse } from "./postResponse";

export type PostRequest = PostResponse & {
  readonly data: PostDataRequest;
};

export type PostDataRequest = PostDataResponse;
