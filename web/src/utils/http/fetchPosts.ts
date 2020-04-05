import { BackendPost, Post } from "../../models/post";
import { ApiClient } from "../ApiClient";

const apiClient = new ApiClient();

export const fetchPosts = (): Promise<Post[]> => {
  return apiClient.allTask().then((bpr) => bpr.tasks.map(backendPostToPost));
};

const backendPostToPost = (bp: BackendPost): Post => {
  return {
    address: bp.data.address,
    position: {
      latitude: bp.location.lat,
      longitude: bp.location.lng,
    },
    title: bp.title,
    description: bp.data.description,
    contactInfo: bp.data.contactInfo,
    id: bp.id,
    needs: bp.data.needs?.split(",") || [],
  };
};
