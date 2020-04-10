import React from "react";
import { Card } from "../card";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// PRESENTATION -------------------------------------------------------------

type SidebarTogglePresentationProps = {
  readonly isOpen: boolean;
  readonly width: number;
  readonly onToggle: () => void;
};

const SidebarTogglePresentation: React.FC<SidebarTogglePresentationProps> = React.memo((props) => {
  const { isOpen, width, onToggle } = props;

  const toggleStyle: React.CSSProperties = {
    position: "absolute",
    left: `${width}px`,
    top: "1rem",
    cursor: "pointer",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    zIndex: -1,
  };

  const carret = isOpen ? faCaretLeft : faCaretRight;

  return (
    <Card style={toggleStyle} innerStyle={{ padding: "1rem 0.5rem" }} onClick={onToggle}>
      <FontAwesomeIcon icon={carret} />
    </Card>
  );
});

// EXPORT ------------------------------------------------------------------

export const SidebarToggle = SidebarTogglePresentation;
