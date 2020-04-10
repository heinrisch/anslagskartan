import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

// PRESENTATION -------------------------------------------------------------

type LoadingIconPresentationProps = {
  readonly loading: boolean;
};

const LoadingIconPresentation: React.FC<LoadingIconPresentationProps> = React.memo((props) => {
  const { loading } = props;
  if (!loading) return null;

  const style: React.CSSProperties = {
    color: "#ff5500",
    cursor: "pointer",
  };

  return <FontAwesomeIcon size="2x" icon={faCompactDisc} style={style} spin />;
});

// EXPORT ------------------------------------------------------------------

export const LoadingIcon = LoadingIconPresentation;
