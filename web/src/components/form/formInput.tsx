import React from "react";
import classNames from "classnames";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";
import { FormField } from "./formField";

// PRESENTATION -------------------------------------------------------------

type FormInputPresentationProps = Omit<HtmlInputProps, "ref"> & {
  readonly error?: boolean;
  readonly errorMessage?: string;
  readonly label: string;
  readonly fullWidth?: boolean;
  readonly reference?:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
};

const FormInputPresentation: React.FC<FormInputPresentationProps> = React.memo((props) => {
  const {
    error,
    errorMessage,
    label,
    className,
    fullWidth,
    name,
    reference,
    ...otherProps
  } = props;
  const inputClassName = classNames("input", { "is-fullwidth": fullWidth }, { "is-danger": error });

  return (
    <FormField label={label}>
      <input className={inputClassName} name={name} ref={reference} {...otherProps} />
      <p className="help is-danger" children={errorMessage} />
    </FormField>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormInput = FormInputPresentation;
