import React from "react";
import { fetchPosts } from "../utils/http/fetchPosts";
import { AppContext } from "./../state/appContext";

export const useFetchAllPostsOnStartEffect = () => {
  const { dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    dispatch({ type: "POSTS_PENDING" });

    fetchPosts()
      .then((posts) => dispatch({ type: "POSTS_RECEIVED", posts }))
      .catch(() => dispatch({ type: "POSTS_REJECTED" }));
  }, [dispatch]);
};
