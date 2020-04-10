import { Post } from "./post";
import { PostResponse } from "../utils/apiClient/models/postResponse";
import { CreatePostRequest } from "../utils/apiClient/models/createPostRequest";
import { Address } from "../components/form/models/address";

const formToCreatePostRequest = (
  post: Record<string, any>,
  address: Address
): CreatePostRequest => ({
  title: post.title,
  location: { lat: address.latitude, lng: address.longitude },
  data: {
    address: address.label,
    contactInfo: post.contactInfo,
    description: post.description,
    needs: [
      post.printer ? "3D printer" : "",
      post.material ? "Material" : "",
      post.food ? "Mat" : "",
      post.other ? "Annat" : "",
    ]
      .filter((x) => x.length > 0)
      .join(", "),
  },
});

const backendPostToFrontendPost = (post: PostResponse): Post => ({
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
});

export const postMapper = {
  formToFrontendPost: formToCreatePostRequest,
  backendPostToFrontendPost,
};
