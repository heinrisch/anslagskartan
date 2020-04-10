import { Post } from "./post";
import { BackendPost, BackendCreatePost } from "./backendPost";
import { Address } from "../components/form/addressInput";

export const postMapper = {
  formToBackendCreatePost: (
    post: Record<string, any>,
    address: Address
  ): BackendCreatePost => ({
    title: post.title,
    location: {
      lat: address.latitude,
      lng: address.longitude,
    },
    data: {
      address: address.label,
      description: post.description,
      contactInfo: post.contactInfo,
      needs: [
        post.printer ? "3D printer" : "",
        post.material ? "Material" : "",
        post.food ? "Mat" : "",
        post.other ? "Annat" : "",
      ]
        .filter((x) => x.length > 0)
        .join(","),
    },
  }),

  toFrontendPost: (post: BackendPost): Post => ({
    address: post.data.address,
    position: {
      latitude: post.location.lat,
      longitude: post.location.lng,
    },
    title: post.title,
    description: post.data.description,
    contactInfo: post.data.contactInfo,
    id: post.id,
    needs: post.data.needs?.split(",") || [],
  }),
};
