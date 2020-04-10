import { MapPosition } from "../components/map/models/mapPosition";

export type Post = {
  readonly address?: string;
  readonly position: MapPosition;
  readonly title: string;
  readonly description?: string;
  readonly contactInfo?: string;
  readonly id?: string;
  readonly needs: string[];
  readonly userId?: string;
};
