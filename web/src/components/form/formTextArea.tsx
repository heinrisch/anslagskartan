import React from "react";
import { HtmlTextAreaProps } from "../../models/htmlProps/htmlTextAreaProps";
import { FormField } from "./formField";

// PRESENTATION -------------------------------------------------------------

type FormTextAreaPresentationProps = HtmlTextAreaProps & {
  readonly label: string;
  readonly name?: string;
};

const FormTextAreaPresentation: React.FC<FormTextAreaPresentationProps> = React.memo((props) => {
  const { label, className, name, ...otherProps } = props;

  return (
    <FormField label={label}>
      <textarea className="textarea" name={name} {...otherProps} />
    </FormField>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormTextArea = FormTextAreaPresentation;
