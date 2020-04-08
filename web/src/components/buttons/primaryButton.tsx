import React from "react";
import { Button, ButtonProps } from "./button";
import classNames from "classnames";

export const PrimaryButton: React.FC<ButtonProps> = React.memo((props) => {
  const { className, style, ...otherProps } = props;
  const buttonClassName = classNames("is-primary", className);

  return <Button className={buttonClassName} {...otherProps} />;
});
