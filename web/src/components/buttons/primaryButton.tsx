import React from "react";
import { Button, ButtonProps } from "./button";
import classNames from "classnames";

// PRESENTATION -------------------------------------------------------------

const PrimaryButtonPresentation: React.FC<ButtonProps> = React.memo((props) => {
  const { className, style, ...otherProps } = props;
  const buttonClassName = classNames("is-primary", className);

  return <Button className={buttonClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const PrimaryButton = PrimaryButtonPresentation;
