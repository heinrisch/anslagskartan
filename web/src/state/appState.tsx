import { Post } from "../models/post";
import { MenuType } from "../scenes/home/models/menuType";
import { MapPosition } from "../scenes/home/models/mapPosition";

export const initialAppState: AppState = {
  posts: [],
  loadingPosts: false,
  loadingAddPost: false,
  mapCenter: { latitude: 59.310519, longitude: 18.057875 },
  menuIsOpen: true,
  menuType: "list",
  selectedPostId: undefined,
  user: null,
  userId: null,
  doNotCheckLogin: false,
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
  userId: null | string;
  doNotCheckLogin: boolean;
};

export type FacebookUser = {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string | null;
};
