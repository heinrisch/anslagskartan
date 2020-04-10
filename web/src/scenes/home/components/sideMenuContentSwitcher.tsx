import React from "react";
import { AppContext } from "../../../state/appContext";
import { MenuType } from "../models/menuType";
import { AddPost } from "./addPost/addPost";
import { PostList } from "./postList/postList";

// CONTAINER ----------------------------------------------------------------

const SideMenuContentSwitcherContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <SideMenuContentSwitcherPresentation menuType={state.menuType} />;
};

// PRESENTATION -------------------------------------------------------------

type SideMenuContentSwitcherPresentationProps = {
  menuType: MenuType;
};

const SideMenuContentSwitcherPresentation: React.FC<SideMenuContentSwitcherPresentationProps> = (
  props
) => {
  const { menuType } = props;

  const style = {
    padding: "1rem",
    overflow: "auto",
    maxHeight: "100vh",
  };

  return (
    <div style={style}>
      <MenuContent menuContentType={menuType} />
    </div>
  );
};

// HELPERS -----------------------------------------------------------------

type MenuContentProps = {
  menuContentType: MenuType;
};

const MenuContent: React.FC<MenuContentProps> = React.memo((props) => {
  const { menuContentType } = props;

  switch (menuContentType) {
    case "add":
      return <AddPost />;

    case "list":
      return <PostList />;

    case "none":
      return null;

    default:
      throw new Error("What menu type? " + menuContentType);
  }
});

// EXPORT ------------------------------------------------------------------

export const SideMenuContentSwitcher = SideMenuContentSwitcherContainer;
