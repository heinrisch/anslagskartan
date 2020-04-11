import React from "react";
import classNames from "classnames";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";
import { FormField } from "./formField";

// PRESENTATION -------------------------------------------------------------

type FormInputPresentationProps = HtmlInputProps & {
  readonly label: string;
  readonly fullWidth?: boolean;
};

const FormInputPresentation: React.FC<FormInputPresentationProps> = React.memo((props) => {
  const { label, className, fullWidth, name, ...otherProps } = props;
  const inputClassName = classNames("input", { "is-fullwidth": fullWidth });

  return (
    <FormField label={label}>
      <input className={inputClassName} name={name} {...otherProps} />
    </FormField>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormInput = FormInputPresentation;
