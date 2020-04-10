import React from "react";
import { HtmlDivProps } from "../../models/htmlProps/htmlDivProps";

// PRESENTATION -------------------------------------------------------------

const ButtonsPresentation: React.FC<HtmlDivProps> = React.memo((props) => {
  return <div className="buttons" {...props} />;
});

// EXPORT ------------------------------------------------------------------

export const Buttons = ButtonsPresentation;
