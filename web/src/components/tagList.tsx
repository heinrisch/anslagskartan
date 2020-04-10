import React from "react";
import classNames from "classnames";
import { HtmlDivProps } from "../models/htmlProps/htmlDivProps";

// PRESENTATION -------------------------------------------------------------

export const TagListPresentation: React.FC<HtmlDivProps> = React.memo((props) => {
  const { className, ...otherProps } = props;
  const tagsClassName = classNames("tags", className);

  return <div className={tagsClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const TagList = TagListPresentation;
