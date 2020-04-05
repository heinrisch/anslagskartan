import React from "react";
import { AppContext } from "../../../state/appContext";
import { MenuType } from "../models/menuType";
import { AddPost } from "./addPost";
import { PostList } from "./postList";

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

  return (
    <div
      style={{
        padding: "1rem",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      {content}
    </div>
  );
};

// EXPORT ------------------------------------------------------------------

export const SideMenuContentSwitcher = SideMenuContentSwitcherContainer;
