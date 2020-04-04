import React from "react";
import { SideMenuItem } from "../../components/sideMenu/sideMenuItem";
import { Post } from "../../models/post";
type SideMenuItemListProps = {
  posts: Post[];
};
export const SideMenuItemList: React.FC<SideMenuItemListProps> = React.memo(
  (props) => {
    const { posts } = props;
    const menuItems = posts.map((post, index) => (
      <SideMenuItem key={index}>
        <div>
          <strong>{post.title}</strong>
        </div>
        <p>{post.description}</p>
        <br />
        <br />
        <i>{post.address}</i>
      </SideMenuItem>
    ));
    return <>{menuItems}</>;
  }
);
