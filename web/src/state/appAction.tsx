import { Post } from "../models/post";
import { MenuType } from "../scenes/home/models/menuType";
import { MapPosition } from "../components/map/models/mapPosition";

export type AppAction =
  | { type: "POSTS_PENDING" }
  | { type: "POSTS_REJECTED" }
  | { type: "POSTS_RECEIVED"; posts: Post[] }
  | { type: "ADD_POST_PENDING" }
  | { type: "ADD_POST_REJECTED" }
  | { type: "ADD_POST_RECEIVED"; post: Post }
  | { type: "TOGGLE_MENU_IS_OPEN"; menuType: MenuType }
  | { type: "UPDATE_MAP_CENTER"; center: MapPosition };
