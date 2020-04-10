import React from "react";
import classNames from "classnames";
import { HtmlButtonProps } from "../../models/htmlProps/htmlButtonProps";

// PRESENTATION -------------------------------------------------------------

type ButtonPresentationProps = Omit<HtmlButtonProps, "size"> & {
  readonly type?: "button" | "submit" | "reset";
  readonly size?: "small" | "normal" | "medium" | "large";
  readonly fullWidth?: boolean;
  readonly withGutter?: 1 | 2 | 3;
  readonly loading?: boolean;
};

const ButtonPresentation: React.FC<ButtonPresentationProps> = React.memo((props) => {
  const {
    className,
    fullWidth,
    type = "button",
    size = "normal",
    withGutter,
    loading,
    ...otherProps
  } = props;

  const buttonClassName = classNames(
    "button",
    `is-${size}`,
    { "is-fullwidth": fullWidth },
    { "with-gutter-1": withGutter === 1 },
    { "with-gutter-2": withGutter === 2 },
    { "with-gutter-3": withGutter === 3 },
    { "is-loading": loading },
    className
  );

  return <button className={buttonClassName} type={type} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const Button = ButtonPresentation;
export type ButtonProps = ButtonPresentationProps;
