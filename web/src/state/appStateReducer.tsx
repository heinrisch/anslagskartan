import { AppState } from "./appState";
import { AppAction } from "./appAction";

export const appStateReducer = (
  state: AppState,
  action: AppAction
): AppState => {
  console.log("state", state, action);

  switch (action.type) {
    case "POSTS_PENDING":
      return {
        ...state,
        loadingPosts: true,
      };

    case "POSTS_RECEIVED":
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false,
      };

    case "POSTS_REJECTED":
      return {
        ...state,
        loadingPosts: false,
      };

    case "ADD_POST_PENDING":
      return {
        ...state,
        loadingAddPost: true,
      };

    case "ADD_POST_RECEIVED":
      return {
        ...state,
        loadingAddPost: false,
        posts: [...state.posts, action.payload],
      };

    case "ADD_POST_REJECTED":
      return {
        ...state,
        loadingAddPost: false,
      };

    default:
      return state;
  }
};
