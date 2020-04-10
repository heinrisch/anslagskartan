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
import { TypographyPresentation } from "../../../../components/text/typography";
import { Title } from "../../../../components/text/title";

// CONTAINER ----------------------------------------------------------------

type PostItemContainerProps = {
  readonly post: Post;
};

const PostItemContainer: React.FC<PostItemContainerProps> = (props) => {
  const { post } = props;
  const { state } = React.useContext(AppContext);

  const isActive = state.selectedPostId === post.id;

  const description = isActive
    ? post.description
    : truncateString(post.description || "", 38, true);

  const address = isActive ? post.address : truncateString(post.address || "", 38, true);

  const handleClick = useHandleSelectPostCallback(post);

  return (
    <PostItemPresentation
      isActive={isActive}
      post={{ ...post, description, address }}
      onClick={handleClick}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type PostItemPresentationProps = {
  readonly isActive: boolean;
  readonly post: Post;
  readonly onClick: () => void;
};

const PostItemPresentation: React.FC<PostItemPresentationProps> = React.memo((props) => {
  const { onClick, post } = props;

  return (
    <Card className="" onClick={onClick} key={post.id}>
      <Title as="h6">{post.title}</Title>
      <PostItemNeeds needs={post.needs} />
      <TypographyPresentation
        as="span"
        size={7}
        style={{ marginTop: "1rem", fontSize: "0.7rem", color: "gray" }}
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.address}
      </TypographyPresentation>
      <div>{post.description}</div>
    </Card>
  );
});

// EXPORT ------------------------------------------------------------------

export const PostItem = PostItemContainer;
