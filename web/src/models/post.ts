import { MapPosition } from "../components/map/models/mapPosition";

export type Post = {
  address?: string;
  position: MapPosition;
  title: string;
  description?: string;
  id?: string;
  needs: string[];
};

export type BackendLocation = {
  lat: number;
  lng: number;
}

export type BackendPostData = {
  address?: string
  description?: string
}

export type BackendPost = {
  id: string;
  title: string;
  userId: string;
  location: BackendLocation;
  data: BackendPostData
}

export type BackendPostResponse = {
  tasks: [BackendPost];
}

export type BackendCreatePost = {
  title: string;
  location: BackendLocation;
  data: BackendPostData;
}

export type TaskResponse = {
  taskId: string;
}
