import React from "react";
import classNames from "classnames";
import { HtmlDivProps } from "../models/htmlProps/htmlDivProps";
import "./card.css";

// PRESENTATION -------------------------------------------------------------

type CardPresentationProps = HtmlDivProps & {
  readonly innerStyle?: React.CSSProperties;
  readonly innerClassName?: string;
};

const CardPresentation: React.FC<CardPresentationProps> = React.memo((props) => {
  const { children, className, innerClassName, innerStyle, ...otherProps } = props;
  const cardClassName = classNames("card", className);
  const innerCardClassName = classNames("card-content", innerClassName);

  return (
    <div className={cardClassName} {...otherProps}>
      <div className={innerCardClassName} children={children} />
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const Card = CardPresentation;
