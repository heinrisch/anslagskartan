import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper } from "@material-ui/core";
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { AppContext } from "../../../state/appContext";
import { SideMenuContentSwitcher } from "./sideMenuContentSwitcher";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";

// CONTAINER ----------------------------------------------------------------

const SideMenuContainer: React.FC = () => {
  const { dispatch, state } = React.useContext(AppContext);

  const handleCloseClick = useHandleToggleSidebarViewCallback(
    dispatch,
    state.menuType
  );

  return (
    <SideMenuPresentation open={state.menuIsOpen} onToggle={handleCloseClick} />
  );
};

// PRESENTATION -------------------------------------------------------------

type SideMenuPresentationProps = {
  open: boolean;
  onToggle: () => void;
};

const SideMenuPresentation: React.FC<SideMenuPresentationProps> = (props) => {
  const { open, onToggle } = props;
  const width = 320;

  const carret = open ? (
    <FontAwesomeIcon icon={faCaretLeft} />
  ) : (
    <FontAwesomeIcon icon={faCaretRight} />
  );

  const toggleStyle: React.CSSProperties = {
    padding: "1rem",
    position: "absolute",
    left: `${width - 2}px`,
    top: "1rem",
    cursor: "pointer",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: -1,
  };

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
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          backgroundColor: "#ffffff",
        }}
      >
        <Paper style={toggleStyle} onClick={onToggle}>
          {carret}
        </Paper>
        <SideMenuContentSwitcher />
      </div>
    </Menu>
  );
};

// EXPORT ------------------------------------------------------------------

export const SideMenu = SideMenuContainer;
