import React from "react";
import classNames from "classnames";

type TagListPorps = React.HTMLProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const TagList: React.FC<TagListPorps> = React.memo((props) => {
  const { className, ...otherProps } = props;
  const tagsClassName = classNames("tags", className);

  return <div className={tagsClassName} {...otherProps} />;
});
