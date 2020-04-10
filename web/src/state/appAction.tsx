import { Post } from "../models/post";
import { MenuType } from "../scenes/home/models/menuType";
import { MapPosition } from "../components/map/models/mapPosition";
import { FacebookUser } from "./appState";

export type AppAction =
  | { type: "POSTS_PENDING" }
  | { type: "POSTS_REJECTED" }
  | { type: "POSTS_RECEIVED"; posts: Post[] }
  | { type: "ADD_POST_PENDING" }
  | { type: "ADD_POST_REJECTED" }
  | { type: "ADD_POST_RECEIVED"; post: Post }
  | { type: "TOGGLE_MENU_IS_OPEN"; menuType: MenuType }
  | { type: "UPDATE_MAP_CENTER"; center: MapPosition }
  | { type: "SELECT_POST"; post: Post }
  | { type: "CLOSE_SIDEBAR" }
  | { type: "FACEBOOK_USER_SIGNED_IN"; user: FacebookUser }
  | { type: "SET_USER_ID"; userId?: string };
