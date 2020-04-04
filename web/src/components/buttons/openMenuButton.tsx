import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

type OpenMenuButtonProps = {
  onClick: () => void;
};

export const OpenMenuButton: React.FC<OpenMenuButtonProps> = React.memo(
  (props) => {
    const { onClick } = props;

    return (
      <FontAwesomeIcon
        size="2x"
        icon={faListAlt}
        onClick={onClick}
        style={{
          color: "#4267B2",
          cursor: "pointer",
        }}
      />
    );
  }
);
