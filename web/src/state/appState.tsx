import { Post } from "../models/post";
import { MenuType } from "../scenes/home/models/menuType";
import { MapPosition } from "../components/map/models/mapPosition";

export const initialAppState: AppState = {
  posts: [],
  loadingPosts: false,
  loadingAddPost: false,
  mapCenter: { latitude: 59.310519, longitude: 18.057875 },
  menuIsOpen: false,
  menuType: "none",
  selectedPostId: undefined,
};

export type AppState = {
  posts: Post[];
  loadingPosts: boolean;
  loadingAddPost: boolean;
  mapCenter: MapPosition;
  menuIsOpen: boolean;
  menuType: MenuType;
  selectedPostId: number | undefined;
};
