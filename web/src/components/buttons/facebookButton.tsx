import React from "react";
import { Button, ButtonProps } from "./button";
import classNames from "classnames";
import "./facebookButton.css";

// PRESENTATION -------------------------------------------------------------

const FacebookButtonPresentation: React.FC<ButtonProps> = React.memo((props) => {
  const { className, ...otherProps } = props;
  const facebookButtonClassName = classNames("facebook-button", className);

  return <Button className={facebookButtonClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const FacebookButton = FacebookButtonPresentation;
