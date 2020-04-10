import React from "react";
import { Button, ButtonProps } from "./button";

// PRESENTATION -------------------------------------------------------------

const FacebookButtonPresentation: React.FC<ButtonProps> = React.memo((props) => {
  const { style, ...otherProps } = props;
  const buttonStyle: React.CSSProperties = {
    ...style,
    color: "#ffffff",
    backgroundColor: "#4267B2",
  };

  return <Button style={buttonStyle} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const FacebookButton = FacebookButtonPresentation;
