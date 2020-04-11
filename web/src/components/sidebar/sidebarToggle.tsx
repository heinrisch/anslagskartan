import React from "react";
import { Card } from "../card";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebarToggle.css";

// PRESENTATION -------------------------------------------------------------

type SidebarTogglePresentationProps = {
  readonly isOpen: boolean;
  readonly width: number;
  readonly onToggle: () => void;
};

const SidebarTogglePresentation: React.FC<SidebarTogglePresentationProps> = React.memo((props) => {
  const { isOpen, width, onToggle, ...otherProps } = props;

  const toggleStyle: React.CSSProperties = {
    left: `${width}px`,
  };

  const carret = isOpen ? faCaretLeft : faCaretRight;

  return (
    <Card
      className="sidebar-toggle"
      innerClassName="inner-sidebar-toggle"
      style={toggleStyle}
      onClick={onToggle}
      {...otherProps}
    >
      <FontAwesomeIcon icon={carret} />
    </Card>
  );
});

// EXPORT ------------------------------------------------------------------

export const SidebarToggle = SidebarTogglePresentation;
