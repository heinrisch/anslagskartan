import { PostLocationRequest } from "./postLocationRequest";
import { PostDataRequest } from "./postRequest";

export type CreatePostRequest = {
  readonly title: string;
  readonly location: PostLocationRequest;
  readonly data: PostDataRequest;
};
