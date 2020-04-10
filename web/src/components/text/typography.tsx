import React from "react";
import classNames from "classnames";

type TypographyProps = React.HTMLProps<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement> & {
    ref?: React.RefObject<HTMLDivElement>;
    as: "span" | "div" | "p";
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    color?: "grey-light";
  };

export const Typography: React.FC<TypographyProps> = React.memo((props) => {
  const { as: TagName, className, color, size, ...otherProps } = props;
  const typographyClassName = classNames(
    `is-size-${size}`,
    `has-text-${color}`,
    className
  );

  return <TagName className={typographyClassName} {...otherProps} />;
});
