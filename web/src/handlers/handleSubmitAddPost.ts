import React from "react";
import { OnSubmit } from "react-hook-form";
import { Address } from "../components/form/addressInput";
import { AppContext } from "../state/appContext";
import { addPosts } from "../utils/http/addPost";
import { fetchPosts } from "../utils/http/fetchPosts";
import { postMapper } from "./../models/postMapper";

export const useHandleSubmitAddPostCallback = (
  address: Address
): OnSubmit<Record<string, any>> => {
  const { dispatch, state } = React.useContext(AppContext);

  return React.useCallback(
    async (data: Record<string, any>) => {
      if (state.userId === null) {
        throw new Error("User is not logged in");
      }

      const postResponse = await addPosts(
        state.userId,
        postMapper.formToBackendCreatePost(data, address)
      );

      dispatch({ type: "ADD_POST_PENDING" });

      await fetchPosts()
        .then((posts) => posts.filter((p) => p.id === postResponse.taskId)[0])
        .then((post) => dispatch({ type: "ADD_POST_RECEIVED", post }))
        .catch((e) => {
          console.log("error in posting post", e);
          dispatch({ type: "ADD_POST_REJECTED" });
        });
    },
    [dispatch, address, state.userId]
  );
};
