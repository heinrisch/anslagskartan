import { MapPosition } from "../components/map/models/mapPosition";

export type Post = {
  address: string;
  position: MapPosition;
  title: string;
  description: string;
  id?: number;
  needs: string[];
};
