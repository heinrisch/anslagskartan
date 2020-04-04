import React from "react";
import { SideMenuItem } from "../../../components/sideMenu/sideMenuItem";
import { Post } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { SearchBar } from "./searchBar";

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

    const menuItems = posts.map((post, index) => (
      <SideMenuItem key={index}>
        <div>
          <strong>{post.title}</strong>
        </div>
        <p>{post.description}</p>
        <i>{post.address}</i>
        <hr />
      </SideMenuItem>
    ));

    return (
      <>
        <SearchBar />
        {menuItems}
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostList = PostListContainer;
