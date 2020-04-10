import React from "react";
import classNames from "classnames";
import { HtmlSpanProps } from "../models/htmlProps/htmlSpanProps";

// PRESENTATION -------------------------------------------------------------

const TagPresentation: React.FC<HtmlSpanProps> = React.memo((props) => {
  const { className, ...otherProps } = props;
  const tagClassName = classNames("tag", className);

  return <span className={tagClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const Tag = TagPresentation;
