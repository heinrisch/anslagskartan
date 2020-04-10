import React from "react";
import { Post } from "../../../../models/post";
import { AppContext } from "../../../../state/appContext";
import { SearchBar } from "../searchBar";
import { PostItem } from "./postItem";
import { PostListFooter } from "./postListFooter";
import { Typography } from "../../../../components/text/typography";

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
    const renderedPosts = posts.map((post) => (
      <PostItem post={post} key={post.id} />
    ));

    return (
      <>
        <SearchBar />
        <Typography as="span" size={7} color="grey-light">
          Visar {renderedPosts.length} resultat
        </Typography>
        <div style={{ margin: "0 -1rem", paddingBottom: "60px" }}>
          {renderedPosts}
        </div>

        <PostListFooter />
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostList = PostListContainer;
