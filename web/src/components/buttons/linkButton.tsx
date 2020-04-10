import React from "react";
import { Button, ButtonProps } from "./button";
import classNames from "classnames";

// PRESENTATION -------------------------------------------------------------

const LinkButtonPresentation: React.FC<ButtonProps> = React.memo((props) => {
  const { className, style, ...otherProps } = props;
  const linkButtonClassName = classNames("is-text", className);

  return <Button className={linkButtonClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const LinkButton = LinkButtonPresentation;
