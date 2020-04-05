import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { Post } from "../../../models/post";
import { truncateString } from "../../../utils/truncateString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../state/appContext";
import { PostItemNeeds } from "./postItemNeeds";
import "./postItem.css";

// CONTAINER ----------------------------------------------------------------

type PostItemContainerProps = {
  post: Post;
};

const PostItemContainer: React.FC<PostItemContainerProps> = (props) => {
  const { post } = props;
  const { dispatch, state } = React.useContext(AppContext);

  const isActive = state.selectedPostId === post.id;

  const description = isActive
    ? post.description
    : truncateString(post.description || "", 40, true);

  const handleClick = React.useCallback(() => {
    dispatch({ type: "SELECT_POST", post });
  }, [dispatch, post]);

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
      <Paper
        variant="outlined"
        className="menu-item post-item"
        onClick={onClick}
        key={post.id}
      >
        <strong>{post.title}</strong>
        <PostItemNeeds needs={post.needs} />
        <Typography
          variant="caption"
          display="block"
          style={{ marginTop: "1rem", fontSize: "0.7rem", color: "gray" }}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.address}
        </Typography>
        <div>{post.description}</div>
      </Paper>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostItem = PostItemContainer;
