import React from "react";
import classNames from "classnames";
import { HtmlHeadingProps } from "../../models/htmlProps/htmlHeadingProps";

// PRESENTATION -------------------------------------------------------------

type SubtitlePresentationProps = HtmlHeadingProps & {
  readonly as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  readonly withGutter?: boolean;
};

export const SubtitlePresentation: React.FC<SubtitlePresentationProps> = React.memo((props) => {
  const { as: TagName, className, withGutter = false, ...otherProps } = props;
  const size = TagName[1];
  const titleClassName = classNames(
    "subtitle",
    `is-${size}`,
    { "without-gutter": !withGutter },
    className
  );

  return <TagName className={titleClassName} {...otherProps} />;
});

// EXPORT ------------------------------------------------------------------

export const Subtitle = SubtitlePresentation;
