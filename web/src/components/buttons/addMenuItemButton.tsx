import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

type AddMenuItemButtonProps = {
  onClick: () => void;
};

export const AddMenuItemButton: React.FC<AddMenuItemButtonProps> = React.memo(
  (props) => {
    const { onClick } = props;

    return (
      <FontAwesomeIcon
        size="2x"
        icon={faPlusSquare}
        onClick={onClick}
        style={{
          color: "#4267B2",
          cursor: "pointer",
        }}
      />
    );
  }
);
