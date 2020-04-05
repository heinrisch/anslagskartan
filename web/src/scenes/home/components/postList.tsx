import React from "react";
import { Typography, Paper, Chip } from "@material-ui/core";
import { Post } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { SearchBar } from "./searchBar";
import { PostItem } from "./postItem";

// CONTAINER ----------------------------------------------------------------

const PostListContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <PostListPresentation posts={state.posts} />;
};

// PRESENTATION -------------------------------------------------------------

type PostListPresentationProps = {
  posts: Post[];
};

const PostListPresentation: React.FC<PostListPresentationProps> = React.memo(
  (props) => {
    const { posts } = props;
    const renderedPosts = posts.map((post) => <PostItem post={post} />);

    return (
      <>
        <SearchBar />
        <Typography variant="caption" display="block" gutterBottom>
          Visar {renderedPosts.length} resultat
        </Typography>
        <div style={{ margin: "0 -1rem" }}>{renderedPosts}</div>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostList = PostListContainer;
