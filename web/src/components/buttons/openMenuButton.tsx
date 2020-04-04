import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

type OpenMenuButtonProps = {
  onClick: () => void;
};

export const OpenMenuButton: React.FC<OpenMenuButtonProps> = React.memo(
  (props) => {
    const { onClick } = props;

    return (
      <FontAwesomeIcon
        size="2x"
        icon={faChevronCircleRight}
        onClick={onClick}
        style={{
          color: "#000000",
          cursor: "pointer",
          position: "absolute",
          top: "50vh",
          left: "1rem",
          zIndex: 1000,
        }}
      />
    );
  }
);
