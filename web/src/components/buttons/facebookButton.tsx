import React from "react";
import { Button, ButtonProps } from "./button";

export const FacebookButton: React.FC<ButtonProps> = React.memo((props) => {
  const { style, ...otherProps } = props;
  const buttonStyle: React.CSSProperties = {
    ...style,
    color: "#ffffff",
    backgroundColor: "#4267B2",
  };

  return <Button style={buttonStyle} {...otherProps} />;
});
