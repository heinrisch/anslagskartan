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
        selectedPostId: action.post.id,
        mapCenter: action.post.position,
      };

    default:
      return state;
  }
};
