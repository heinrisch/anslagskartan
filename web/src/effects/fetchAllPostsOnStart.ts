import { apiClient } from "./../utils/apiClient/index";
import React from "react";
import { AppContext } from "./../state/appContext";

export const useFetchAllPostsOnStartEffect = () => {
  const { dispatch, state } = React.useContext(AppContext);

  React.useEffect(() => {
    dispatch({ type: "POSTS_PENDING" });

    apiClient
      .fetchAllPosts(state.userId)
      .then((posts) => dispatch({ type: "POSTS_RECEIVED", posts }))
      .catch(() => dispatch({ type: "POSTS_REJECTED" }));
  }, [dispatch, state.userId]);
};
