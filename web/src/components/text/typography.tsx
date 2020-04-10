import React from "react";
import classNames from "classnames";
import { HtmlSpanProps } from "../../models/htmlProps/htmlSpanProps";

// PRESENTATION -------------------------------------------------------------

type TypographyPresentationProps = HtmlSpanProps & {
  readonly ref?: React.RefObject<HTMLDivElement>;
  readonly as: "span" | "div" | "p";
  readonly size: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly color?: "grey-light";
};

export const TypographyPresentation: React.FC<TypographyPresentationProps> = React.memo((props) => {
  const { as: TagName, className, color, size, ...otherProps } = props;
  const typographyClassName = classNames(`is-size-${size}`, `has-text-${color}`, className);

  return <TagName className={typographyClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const Typography = TypographyPresentation;
