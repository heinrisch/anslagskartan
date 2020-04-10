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
  doNotCheckLogin: false,
};

export type AppState = {
  readonly posts: Post[];
  readonly loadingPosts: boolean;
  readonly loadingAddPost: boolean;
  readonly mapCenter: MapPosition;
  readonly menuIsOpen: boolean;
  readonly menuType: MenuType;
  readonly selectedPostId?: string;
  readonly user?: FacebookUser;
  readonly userId?: string;
  readonly doNotCheckLogin: boolean;
};

export type FacebookUser = {
  readonly uid: string;
  readonly displayName: string;
  readonly photoURL: string;
  readonly email: string;
  readonly phoneNumber: string | null;
};
