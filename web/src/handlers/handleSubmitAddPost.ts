import React from "react";
import { OnSubmit } from "react-hook-form";
import { Address } from "../components/form/models/address";
import { AppContext } from "../state/appContext";
import { postMapper } from "./../models/postMapper";
import { apiClient } from "./../utils/apiClient/index";

export const useHandleSubmitAddPostCallback = (address: Address): OnSubmit<Record<string, any>> => {
  const { dispatch, state } = React.useContext(AppContext);

  return React.useCallback(
    async (data: Record<string, any>) => {
      if (state.userId === null) {
        throw new Error("User is not logged in");
      }

      const newPostId = await apiClient.createPost(
        postMapper.formToFrontendPost(data, address),
        state.userId
      );

      dispatch({ type: "ADD_POST_PENDING" });

      await apiClient
        .fetchAllPosts(state.userId)
        .then((posts) => posts.filter((p) => p.id === newPostId)[0])
        .then((post) => dispatch({ type: "ADD_POST_RECEIVED", post }))
        .catch((e) => dispatch({ type: "ADD_POST_REJECTED" }));
    },
    [dispatch, address, state.userId]
  );
};
