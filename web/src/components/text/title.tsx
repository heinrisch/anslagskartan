import React from "react";
import classNames from "classnames";
import { HtmlHeadingProps } from "../../models/htmlProps/htmlHeadingProps";

// PRESENTATION -------------------------------------------------------------

type TitlePresentationProps = HtmlHeadingProps & {
  readonly as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readonly withGutter?: boolean;
};

export const TitlePresentation: React.FC<TitlePresentationProps> = React.memo((props) => {
  const { as: TagName, className, withGutter = false, ...otherProps } = props;
  const size = TagName[1];
  const titleClassName = classNames(
    "title",
    `is-${size}`,
    { "without-gutter": !withGutter },
    className
  );

  return <TagName className={titleClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const Title = TitlePresentation;
