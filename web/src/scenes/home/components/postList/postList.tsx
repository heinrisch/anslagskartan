import React from "react";
import { Post } from "../../../../models/post";
import { AppContext } from "../../../../state/appContext";
import { SearchBar } from "../searchBar";
import { PostItem } from "./postItem";
import { PostListFooter } from "./postListFooter";
import { TypographyPresentation } from "../../../../components/text/typography";

// CONTAINER ----------------------------------------------------------------

const PostListContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <PostListPresentation posts={state.posts} />;
};

// PRESENTATION -------------------------------------------------------------

type PostListPresentationProps = {
  readonly posts: Post[];
};

const PostListPresentation: React.FC<PostListPresentationProps> = React.memo((props) => {
  const { posts } = props;
  const renderedPosts = posts.map((post) => <PostItem post={post} key={post.id} />);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <div style={{ padding: "1rem", marginBottom: "0.4rem", backgroundColor: "white" }}>
        <SearchBar />
        <TypographyPresentation as="span" size={7} color="grey-light">
          Visar {renderedPosts.length} resultat
        </TypographyPresentation>
      </div>

      <div style={{ overflowY: "auto" }}>{renderedPosts}</div>

      <PostListFooter />
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const PostList = PostListContainer;
