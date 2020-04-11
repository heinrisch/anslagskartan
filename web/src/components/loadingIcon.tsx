import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import "./loadingIcon.css";

// PRESENTATION -------------------------------------------------------------

type LoadingIconPresentationProps = {
  readonly loading: boolean;
};

const LoadingIconPresentation: React.FC<LoadingIconPresentationProps> = React.memo((props) => {
  const { loading } = props;
  if (!loading) return null;

  return <FontAwesomeIcon className="loading-icon" size="2x" icon={faCompactDisc} spin />;
});

// EXPORT ------------------------------------------------------------------

export const LoadingIcon = LoadingIconPresentation;
