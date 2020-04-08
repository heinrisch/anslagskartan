import React from "react";
import classNames from "classnames";

export type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "size"> &
  React.HTMLAttributes<HTMLButtonElement> & {
    type?: "button" | "submit" | "reset";
    size?: "small" | "normal" | "medium" | "large";
    fullWidth?: boolean;
  };

export const Button: React.FC<ButtonProps> = React.memo((props) => {
  const {
    className,
    fullWidth,
    type = "button",
    size = "normal",
    ...otherProps
  } = props;

  const buttonClassName = classNames(
    "button",
    `is-${size}`,
    { "is-fullwidth": fullWidth },
    className
  );

  return <button className={buttonClassName} type={type} {...otherProps} />;
});
