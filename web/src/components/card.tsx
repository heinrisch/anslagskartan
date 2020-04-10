import React from "react";
import classNames from "classnames";
import { HtmlDivProps } from "../models/htmlProps/htmlDivProps";

// PRESENTATION -------------------------------------------------------------

type CardPresentationProps = HtmlDivProps & {
  readonly innerStyle?: React.CSSProperties;
};

const CardPresentation: React.FC<CardPresentationProps> = React.memo((props) => {
  const { children, className, innerStyle, ...otherProps } = props;
  const cardClassName = classNames("card", className);

  return (
    <div className={cardClassName} {...otherProps}>
      <div
        className="card-content"
        style={{ padding: "1rem", ...innerStyle }}
        children={children}
      />
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const Card = CardPresentation;
