import React from "react";
import { SideMenuItem } from "../../components/sideMenu/sideMenuItem";
import { Post } from "../../models/post";
type SideMenuItemListProps = {
  posts: Post[];
};
export const SideMenuItemList: React.FC<SideMenuItemListProps> = React.memo(
  (props) => {
    const { posts } = props;
    const menuItems = posts.map((position, index) => (
      <SideMenuItem key={index}>{position.name}</SideMenuItem>
    ));
    return <>{menuItems}</>;
  }
);
