import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

type LoginInfoProps = {
  displayName: string;
  className: string;
};

export const LoginInfo: React.FC<LoginInfoProps> = React.memo((props) => {
  const { displayName, className } = props;

  return (
    <FontAwesomeIcon
      className={className}
      icon={faIdCard}
      size="2x"
      style={{ color: "#000000", cursor: "pointer" }}
    />
  );
});
