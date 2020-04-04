import React from "react";
import { SideMenuContainer } from "../../components/sideMenu/sideMenuContainer";
import { ActionButtonList } from "./components/actionButtonList";
import { Map } from "./components/map";
import { SideMenu } from "./components/sideMenu";

// PRESENTATION -------------------------------------------------------------

export const HomeScenePresentation: React.FC = React.memo(() => {
  return (
    <SideMenuContainer>
      <SideMenu />

      <main id="page-wrap">
        <Map />
        <ActionButtonList />
      </main>
    </SideMenuContainer>
  );
});

// EXPORT ------------------------------------------------------------------

export const HomeScene = HomeScenePresentation;
