import React from "react";
import { SideMenuContentSwitcher } from "./sideMenuContentSwitcher";
import { slide as Menu } from "react-burger-menu";
import { AppContext } from "../../../state/appContext";

// CONTAINER ----------------------------------------------------------------

const SideMenuContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <SideMenuPresentation open={state.menuIsOpen} />;
};

// PRESENTATION -------------------------------------------------------------

type SideMenuPresentationProps = {
  open: boolean;
};

const SideMenuPresentation: React.FC<SideMenuPresentationProps> = (props) => {
  const { open } = props;

  return (
    <Menu
      pageWrapId="page-wrap"
      isOpen={open}
      overlayClassName="side-menu__overlay"
      noOverlay
      disableAutoFocus
      disableCloseOnEsc
      disableOverlayClick
    >
      <SideMenuContentSwitcher />
    </Menu>
  );
};

// EXPORT ------------------------------------------------------------------

export const SideMenu = SideMenuContainer;
