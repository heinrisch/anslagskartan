import classNames from "classnames";
import React from "react";
import { HtmlDivProps } from "../../models/htmlProps/htmlDivProps";

// PRESENTATION -------------------------------------------------------------

type FormFieldPresentationProps = HtmlDivProps & {
  readonly label: string;
};

const FormFieldPresentation: React.FC<FormFieldPresentationProps> = React.memo((props) => {
  const { children, label, className, name, ...otherProps } = props;
  const fieldClassName = classNames("field", className);

  return (
    <div className={fieldClassName} {...otherProps}>
      <label className="label" children={label} />
      <div className="control">{children}</div>
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormField = FormFieldPresentation;
