import React from "react";
import { Post } from "../../../../models/post";
import { truncateString } from "../../../../utils/truncateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../../state/appContext";
import { PostItemNeeds } from "./postItemNeeds";
import "./postItem.css";
import { useHandleSelectPostCallback } from "../../../../handlers/handleSelectPost";
import { Card } from "../../../../components/card";
import { Typography } from "../../../../components/text/typography";

// CONTAINER ----------------------------------------------------------------

type PostItemContainerProps = {
  post: Post;
};

const PostItemContainer: React.FC<PostItemContainerProps> = (props) => {
  const { post } = props;
  const { state } = React.useContext(AppContext);

  const isActive = state.selectedPostId === post.id;

  const description = isActive
    ? post.description
    : truncateString(post.description || "", 40, true);

  const handleClick = useHandleSelectPostCallback(post);

  return (
    <PostItemPresentation
      isActive={isActive}
      post={{ ...post, description }}
      onClick={handleClick}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type PostItemPresentationProps = {
  isActive: boolean;
  post: Post;
  onClick: () => void;
};

const PostItemPresentation: React.FC<PostItemPresentationProps> = React.memo(
  (props) => {
    const { onClick, post } = props;

    return (
      <Card className="menu-item post-item" onClick={onClick} key={post.id}>
        <strong>{post.title}</strong>
        <PostItemNeeds needs={post.needs} />
        <Typography
          as="span"
          size={7}
          style={{ marginTop: "1rem", fontSize: "0.7rem", color: "gray" }}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.address}
        </Typography>
        <div>{post.description}</div>
      </Card>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostItem = PostItemContainer;
