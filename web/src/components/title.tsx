import React from "react";
import classNames from "classnames";

type TitleProps = React.HTMLProps<HTMLHeadingElement> &
  React.HTMLAttributes<HTMLHeadingElement> & {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export const Title: React.FC<TitleProps> = React.memo((props) => {
  const { as: TagName, className, ...otherProps } = props;
  const size = TagName[1];
  const titleClassName = classNames("title", `is-${size}`, className);

  return <TagName className={titleClassName} {...otherProps} />;
});