import React, { useState } from "react";
import { reveal as Menu, State as MenuState } from "react-burger-menu";
import { OpenMenuButton } from "../../components/buttons/openMenuButton";
import { Map } from "../../components/map/map";
import { Post } from "../../models/post";
import { SideMenuContainer } from "../../components/sideMenu/sideMenuContainer";
import { SideMenuItemList } from "../../components/sideMenu/sideMenuItemList";
import { AuthConsumer } from "../../components/authConsumer/authConsumer";
import { AddMenuItemButton } from "../../components/buttons/addMenuItemButton";

type HomeSceneProps = {
  posts: Post[];
};

export const HomeScenePresentation: React.FC<HomeSceneProps> = React.memo(
  (props) => {
    const { posts } = props;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenuOpenClick = () => setMenuIsOpen(!menuIsOpen);
    const handleMenuStateChange = (state: MenuState) =>
      setMenuIsOpen(state.isOpen);

    return (
      <SideMenuContainer>
        <Menu
          pageWrapId="page-wrap"
          isOpen={menuIsOpen}
          onStateChange={handleMenuStateChange}
          noOverlay
        >
          <SideMenuItemList posts={posts} />
        </Menu>

        <main id="page-wrap">
          <Map
            defaultCenter={{ latitude: 59.310519, longitude: 18.057875 }}
            defaultZoom={13}
            markers={[]}
          />
          <ActionButtonList>
            <AuthConsumer /> <OpenMenuButton onClick={handleMenuOpenClick} />{" "}
            <AddMenuItemButton onClick={() => ""} />
          </ActionButtonList>
        </main>
      </SideMenuContainer>
    );
  }
);

export const ActionButtonList: React.FC = (props) => {
  const { children } = props;

  return (
    <div
      style={{
        position: "absolute",
        left: "1rem",
        bottom: "1rem",
        zIndex: 1000,
        backgroundColor: "#ffffff",
        padding: "0.5rem",
      }}
    >
      {children}
    </div>
  );
};
