import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

type LoginInfoProps = {
  displayName: string;
};

export const LoginInfo: React.FC<LoginInfoProps> = React.memo((props) => {
  const { displayName } = props;

  return (
    <FontAwesomeIcon
      icon={faIdCard}
      size="2x"
      style={{ color: "#000000", cursor: "pointer" }}
    />
  );
});
