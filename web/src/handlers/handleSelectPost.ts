import React from "react";
import { Post } from "../models/post";
import { AppContext } from "../state/appContext";

export const useHandleSelectPostCallback = (post: Post) => {
  const { dispatch } = React.useContext(AppContext);

  return React.useCallback(() => {
    dispatch({ type: "SELECT_POST", post });
  }, [dispatch, post]);
};
