import React from "react";
import { Card } from "../card";
import { SideMenuContentSwitcher } from "../../scenes/home/components/sideMenuContentSwitcher";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../state/appContext";
import { useHandleToggleSidebarViewCallback } from "../../handlers/handleToggleSidebarView";

// CONTAINER ----------------------------------------------------------------

type SidebarToggleContainerProps = {
  readonly width: number;
};

const SidebarMenuToggleContainer: React.FC<SidebarToggleContainerProps> = React.memo(
  (props) => {
    const { state } = React.useContext(AppContext);
    const { width } = props;

    const handleCloseClick = useHandleToggleSidebarViewCallback();

    return (
      <SidebarTogglePresentation
        isOpen={state.menuIsOpen}
        width={width}
        onToggle={handleCloseClick}
      />
    );
  }
);

// PRESENTATION -------------------------------------------------------------

type SidebarTogglePresentationProps = {
  readonly isOpen: boolean;
  readonly width: number;
  readonly onToggle: () => void;
};

const SidebarTogglePresentation: React.FC<SidebarTogglePresentationProps> = React.memo(
  (props) => {
    const { isOpen, width, onToggle } = props;

    const wrapperStyle: React.CSSProperties = {
      height: "100vh",
      width: "100%",
      position: "absolute",
      backgroundColor: "#ffffff",
    };

    const toggleStyle: React.CSSProperties = {
      position: "absolute",
      left: `${width - 2}px`,
      top: "1rem",
      cursor: "pointer",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      zIndex: -1,
    };

    const carret = isOpen ? faCaretLeft : faCaretRight;

    return (
      <div style={wrapperStyle}>
        <Card style={toggleStyle} onClick={onToggle}>
          <FontAwesomeIcon icon={carret} />
        </Card>
        <SideMenuContentSwitcher />
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const SidebarMenuToggle = SidebarMenuToggleContainer;
