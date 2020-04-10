import React from "react";
import classNames from "classnames";
import { HtmlTextAreaProps } from "../../models/htmlProps/htmlTextAreaProps";

// PRESENTATION -------------------------------------------------------------

type FormTextAreaPresentationProps = HtmlTextAreaProps & {
  readonly label: string;
  readonly name?: string;
};

const FormTextAreaPresentation: React.FC<FormTextAreaPresentationProps> = React.memo((props) => {
  const { label, className, name, ...otherProps } = props;
  const fieldClassName = classNames("field", className);

  return (
    <div className={fieldClassName}>
      <label className="label" children={label} />
      <div className="control">
        <textarea className="textarea" name={name} {...otherProps} />
      </div>
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormTextArea = FormTextAreaPresentation;
