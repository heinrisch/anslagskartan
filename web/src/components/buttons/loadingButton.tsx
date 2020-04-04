import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

type LoadingButtonProps = {
  loading: boolean;
};

export const LoadingButton: React.FC<LoadingButtonProps> = React.memo(
  (props) => {
    const { loading } = props;
    if (!loading) return null;

    return (
      <FontAwesomeIcon
        size="2x"
        icon={faCompactDisc}
        style={{
          color: "#ff5500",
          cursor: "pointer",
        }}
        spin
      />
    );
  }
);
