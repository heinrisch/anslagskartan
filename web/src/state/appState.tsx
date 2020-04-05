import { Post } from "../models/post";
import { MenuType } from "../scenes/home/models/menuType";
import { MapPosition } from "../components/map/models/mapPosition";

export const initialAppState: AppState = {
  posts: [],
  loadingPosts: false,
  loadingAddPost: false,
  mapCenter: { latitude: 59.310519, longitude: 18.057875 },
  menuIsOpen: true,
  menuType: "list",
  selectedPostId: undefined,
  user: null,
};

export type AppState = {
  posts: Post[];
  loadingPosts: boolean;
  loadingAddPost: boolean;
  mapCenter: MapPosition;
  menuIsOpen: boolean;
  menuType: MenuType;
  selectedPostId: string | undefined;
  user: null | FacebookUser;
};

export type FacebookUser = {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string | null;
};
