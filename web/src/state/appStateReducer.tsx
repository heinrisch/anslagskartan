import { AppState } from "./appState";
import { AppAction } from "./appAction";

export const appStateReducer = (
  state: AppState,
  action: AppAction
): AppState => {
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

    default:
      return state;
  }
};
