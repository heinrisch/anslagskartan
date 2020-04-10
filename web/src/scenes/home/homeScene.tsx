import React from "react";
import { SidebarWrapper } from "../../components/sidebar/sidebarWrapper";
import { ActionButtonList } from "./components/actionButtonList/actionButtonList";
import { PostMap } from "./components/postMap/postMap";
import { useFetchAllPostsOnStartEffect } from "../../effects/fetchAllPostsOnStart";
import { Sidebar } from "../../components/sidebar/sidebar";
import { SidebarPageWrapper } from "../../components/sidebar/sidebarPageWrapper";

// PRESENTATION -------------------------------------------------------------

export const HomeScenePresentation: React.FC = React.memo(() => {
  useFetchAllPostsOnStartEffect();

  return (
    <SidebarWrapper>
      <Sidebar />

      <SidebarPageWrapper>
        <PostMap />
        <ActionButtonList />
      </SidebarPageWrapper>
    </SidebarWrapper>
  );
});

// EXPORT ------------------------------------------------------------------

export const HomeScene = HomeScenePresentation;
