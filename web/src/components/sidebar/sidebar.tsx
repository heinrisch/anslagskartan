import React from "react";
import { slide as Menu } from "react-burger-menu";
import { SidebarMenuToggle } from "./sidebarToggle";
import { AppContext } from "../../state/appContext";
import { SideMenuContentSwitcher } from "../../scenes/home/components/sideMenuContentSwitcher";

// CONTAINER ----------------------------------------------------------------

const SidebarContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  return <SidebarPresentation open={state.menuIsOpen} />;
});

// PRESENTATION -------------------------------------------------------------

type SidebarPresentationProps = {
  open: boolean;
};

const SidebarPresentation: React.FC<SidebarPresentationProps> = React.memo(
  (props) => {
    const { open } = props;
    const width = 320;

    return (
      <Menu
        pageWrapId="page-wrap"
        isOpen={open}
        overlayClassName="side-menu__overlay"
        width={`${width}px`}
        noOverlay
        disableAutoFocus
        disableCloseOnEsc
        disableOverlayClick
      >
        <SidebarMenuToggle width={width} />
        <SideMenuContentSwitcher />
      </Menu>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const Sidebar = SidebarContainer;
