import React from "react";
import { Typography, Paper, Chip } from "@material-ui/core";
import { Post } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { SearchBar } from "./searchBar";
import { truncateString } from "../../../utils/truncateString";

// CONTAINER ----------------------------------------------------------------

const PostListContainer: React.FC = () => {
  const { dispatch, state } = React.useContext(AppContext);

  const handlePostClick = React.useCallback(
    (post: Post) => {
      dispatch({ type: "SELECT_POST", post });
    },
    [dispatch]
  );

  return (
    <PostListPresentation
      selectedPostId={state.selectedPostId}
      posts={state.posts}
      onClick={handlePostClick}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type PostListPresentationProps = {
  selectedPostId: number | undefined;
  posts: Post[];
  onClick: (post: Post) => void;
};

const PostListPresentation: React.FC<PostListPresentationProps> = React.memo(
  (props) => {
    const { posts, onClick, selectedPostId } = props;

    const menuItems = posts.map((post) => {
      const handleClick = () => onClick(post);
      const currentIsActive = selectedPostId === post.id;
      const description = currentIsActive
        ? post.description
        : truncateString(post.description, 40, true);

      return (
        <Paper
          variant="outlined"
          className="menu-item"
          style={{ cursor: "pointer", padding: "0.5rem 1rem" }}
          onClick={handleClick}
          key={post.id}
        >
          <Typography variant="h6">{post.title}</Typography>
          <div style={{ fontSize: "0.7rem" }}>
            Behöver{" "}
            <Chip
              style={{ fontSize: "0.7rem", height: "1rem" }}
              size="small"
              color="primary"
              label="3D printing"
            />
          </div>
          <div>{description}</div>
        </Paper>
      );
    });

    return (
      <>
        <SearchBar />
        <Typography variant="caption" display="block" gutterBottom>
          Visar {menuItems.length} resultat
        </Typography>
        <div style={{ margin: "0 -1rem" }}>{menuItems}</div>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostList = PostListContainer;
