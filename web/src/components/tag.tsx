import React from "react";
import classNames from "classnames";

type TagProps = React.HTMLProps<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement>;

export const Tag: React.FC<TagProps> = React.memo((props) => {
  const { className, ...otherProps } = props;
  const tagClassName = classNames("tag", className);

  return <span className={tagClassName} {...otherProps} />;
});
