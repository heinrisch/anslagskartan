import { MapPosition } from "../components/map/mapPosition";

export type Post = {
  address?: string;
  position: MapPosition;
  title: string;
  description?: string;
  contactInfo?: string;
  id?: string;
  needs: string[];
  userId?: string;
};
