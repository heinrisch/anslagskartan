import React, { useState } from "react";
import { reveal as Menu, State as MenuState } from "react-burger-menu";
import { OpenMenuButton } from "../../components/buttons/openMenuButton";
import { Map } from "../../components/map/map";
import { Post } from "../../models/post";
import { SideMenuContainer } from "../../components/sideMenu/sideMenuContainer";
import { SideMenuItemList } from "../../components/sideMenu/sideMenuItemList";
import { AuthConsumer } from "../../components/authConsumer/authConsumer";
import { AddMenuItemButton } from "../../components/buttons/addMenuItemButton";
import { AddMenuItem } from "../../components/addMenuItem/addMenuItem";
import { LoadingButton } from "../../components/buttons/loadingButton";
import { Paper } from "@material-ui/core";

type HomeSceneProps = {
  posts: Post[];
  loadingPosts: boolean;
};

type MenuType = "list" | "add";

export const HomeScenePresentation: React.FC<HomeSceneProps> = React.memo(
  (props) => {
    const { posts, loadingPosts } = props;
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [menuType, setMenuType] = useState<MenuType>("add");

    console.log("posts", posts);

    const handleMenuItemListOpenClick = () => {
      setMenuType("list");
      setMenuIsOpen(!menuIsOpen);
    };

    const handleMenuAddMenuItemOpenClick = () => {
      setMenuType("add");
      setMenuIsOpen(!menuIsOpen);
    };

    const handleMenuStateChange = (state: MenuState) =>
      setMenuIsOpen(state.isOpen);

    return (
      <SideMenuContainer>
        <Menu
          pageWrapId="page-wrap"
          isOpen={true}
          onStateChange={handleMenuStateChange}
          noOverlay
        >
          <MenuContent posts={posts} menuType={menuType} />
        </Menu>

        <main id="page-wrap">
          <Map
            defaultCenter={{ latitude: 59.310519, longitude: 18.057875 }}
            defaultZoom={13}
            markers={[]}
          />
          <ActionButtonList>
            <Paper style={{ display: "inline-block", padding: "0.5rem" }}>
              <AuthConsumer />{" "}
              <OpenMenuButton onClick={handleMenuItemListOpenClick} />{" "}
              <AddMenuItemButton onClick={handleMenuAddMenuItemOpenClick} />
            </Paper>{" "}
            <Paper style={{ display: "inline-block", padding: "0.5rem" }}>
              <LoadingButton loading={loadingPosts} />
            </Paper>
          </ActionButtonList>
        </main>
      </SideMenuContainer>
    );
  }
);

export const MenuContent: React.FC<{ menuType: MenuType; posts: Post[] }> = (
  props
) => {
  const { menuType, posts } = props;

  switch (menuType) {
    case "add":
      return <AddMenuItem />;

    case "list":
      return <SideMenuItemList posts={posts} />;

    default:
      throw new Error("What menu type? " + menuType);
  }
};

export const ActionButtonList: React.FC = (props) => {
  const { children } = props;

  return (
    <div
      style={{
        position: "absolute",
        left: "1rem",
        bottom: "1rem",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};
