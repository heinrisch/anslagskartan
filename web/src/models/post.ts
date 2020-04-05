import { MapPosition } from "../components/map/models/mapPosition";

export type Post = {
  address?: string;
  position: MapPosition;
  title: string;
  description?: string;
  id?: string;
  needs: string[];
};

export type BackendPost = {
  id: string,
  title: string,
  userId: string,
  location: {
    lat: number,
    lng: number
  },
  data: {
    address?: string
    description?: string
  }
}

export type BackendPostResponse = {
  tasks: [BackendPost];
}
