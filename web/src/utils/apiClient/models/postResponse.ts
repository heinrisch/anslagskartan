import { PostLocationResponse } from "./postLocationResponse";

export type PostResponse = {
  readonly id: string;
  readonly title: string;
  readonly userId: string;
  readonly location: PostLocationResponse;
  readonly data: PostDataResponse;
};

export type PostDataResponse = {
  readonly address?: string;
  readonly description?: string;
  readonly contactInfo?: string;
  readonly needs?: string;
};
