import React from "react";
import { AppAction } from "../state/appAction";
import { Post } from "../models/post";

export const useHandleSelectPostCallback = (
  dispatch: React.Dispatch<AppAction>,
  post: Post
) => {
  return React.useCallback(() => {
    dispatch({ type: "SELECT_POST", post });
  }, [dispatch, post]);
};
