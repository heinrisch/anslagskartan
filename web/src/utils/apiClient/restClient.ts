import axios, { AxiosResponse } from "axios";

const get = <T>(uri: string, userId?: string): Promise<AxiosResponse<T>> =>
  axios.get(uri, { headers: { idToken: userId } });

const post = <T>(uri: string, data: any, userId?: string): Promise<AxiosResponse<T>> =>
  axios.post(uri, data, { headers: { idToken: userId } });

export const restClient = {
  get,
  post,
};
