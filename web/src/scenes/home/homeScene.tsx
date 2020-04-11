import React from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { useFetchAllPostsOnStartEffect } from "../../effects/fetchAllPostsOnStart";
import { useHandleToggleSidebarViewCallback } from "../../handlers/handleToggleSidebarView";
import { AppContext } from "../../state/appContext";
import { ActionButtonList } from "./components/actionButtonList/actionButtonList";
import { PostMap } from "./components/postMap/postMap";
import { SidebarContentSwitcher } from "./components/sidebarContentSwitcher";

// CONTAINER ----------------------------------------------------------------

const HomeSceneContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);
  const handleToggleSidebarIsOpenClick = useHandleToggleSidebarViewCallback();

  return (
    <HomeScenePresentation
      isSidebarOpen={state.menuIsOpen}
      onToggleSidebarIsOpen={handleToggleSidebarIsOpenClick}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type HomeScenePresentationProps = {
  readonly isSidebarOpen: boolean;
  readonly onToggleSidebarIsOpen: () => void;
};

export const HomeScenePresentation: React.FC<HomeScenePresentationProps> = React.memo((props) => {
  const { isSidebarOpen, onToggleSidebarIsOpen } = props;

  useFetchAllPostsOnStartEffect();

  return (
    <>
      <Sidebar open={isSidebarOpen} onToggleOpen={onToggleSidebarIsOpen}>
        <SidebarContentSwitcher />
      </Sidebar>

      <PostMap />
      <ActionButtonList />
    </>
  );
});

// EXPORT ------------------------------------------------------------------

export const HomeScene = HomeSceneContainer;
