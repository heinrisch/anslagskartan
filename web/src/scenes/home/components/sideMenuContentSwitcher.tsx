import React from "react";
import { AppContext } from "../../../state/appContext";
import { MenuType } from "../models/menuType";
import { AddPost } from "./addPost/addPost";
import { PostList } from "./postList/postList";

// CONTAINER ----------------------------------------------------------------

const SidebarContentSwitcherContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <SidebarContentSwitcherPresentation menuType={state.menuType} />;
};

// PRESENTATION -------------------------------------------------------------

type SidebarContentSwitcherPresentationProps = {
  readonly menuType: MenuType;
};

const SidebarContentSwitcherPresentation: React.FC<SidebarContentSwitcherPresentationProps> = (
  props
) => {
  const { menuType } = props;
  let content = null;

  switch (menuType) {
    case "add":
      content = <AddPost />;
      break;

    case "list":
      content = <PostList />;
      break;

    case "none":
      content = null;
      break;

    default:
      throw new Error("What menu type? " + menuType);
  }

  return <div style={{ height: "100vh" }} children={content} />;
};

// EXPORT ------------------------------------------------------------------

export const SidebarContentSwitcher = SidebarContentSwitcherContainer;
