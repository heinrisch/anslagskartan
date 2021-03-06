import { AppState } from "./appState";
import { AppAction } from "./appAction";
import { withReducerLog } from "../utils/withReducerLog";

export const appStateReducer = withReducerLog(
  (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case "POSTS_PENDING":
        return {
          ...state,
          loadingPosts: true,
        };

      case "POSTS_RECEIVED":
        return {
          ...state,
          posts: action.posts,
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
          posts: [...state.posts, action.post],
        };

      case "ADD_POST_REJECTED":
        return {
          ...state,
          loadingAddPost: false,
        };

      case "TOGGLE_MENU_IS_OPEN":
        return {
          ...state,
          menuIsOpen: state.menuType !== action.menuType || !state.menuIsOpen,
          menuType: action.menuType,
        };

      case "UPDATE_MAP_CENTER":
        return {
          ...state,
          mapCenter: action.center,
        };

      case "SELECT_POST":
        return {
          ...state,
          selectedPostId: action.post.id === state.selectedPostId ? "0" : action.post.id,
          mapCenter: action.post.position,
        };

      case "CLOSE_SIDEBAR":
        return {
          ...state,
          menuIsOpen: false,
          menuType: "none",
        };

      case "FACEBOOK_USER_SIGNED_IN":
        return {
          ...state,
          user: action.user,
        };

      case "SET_USER_ID":
        return {
          ...state,
          userId: action.userId,
        };

      default:
        return state;
    }
  }
);
