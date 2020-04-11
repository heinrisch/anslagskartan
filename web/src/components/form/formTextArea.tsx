import React from "react";
import { HtmlTextAreaProps } from "../../models/htmlProps/htmlTextAreaProps";
import { FormField } from "./formField";
import classNames from "classnames";

// PRESENTATION -------------------------------------------------------------

type FormTextAreaPresentationProps = Omit<HtmlTextAreaProps, "ref"> & {
  readonly error?: boolean;
  readonly errorMessage?: string;
  readonly label: string;
  readonly name?: string;
  readonly fullWidth?: boolean;
  readonly reference?:
    | ((instance: HTMLTextAreaElement | null) => void)
    | React.RefObject<HTMLTextAreaElement>
    | null
    | undefined;
};

const FormTextAreaPresentation: React.FC<FormTextAreaPresentationProps> = React.memo(
  React.forwardRef((props) => {
    const {
      label,
      className,
      name,
      reference,
      fullWidth,
      error,
      errorMessage,
      ...otherProps
    } = props;

    const textAreaClassName = classNames(
      "textarea",
      { "is-fullwidth": fullWidth },
      { "is-danger": error }
    );

    return (
      <FormField label={label}>
        <textarea className={textAreaClassName} name={name} ref={reference} {...otherProps} />
        <p className="help is-danger" children={errorMessage} />
      </FormField>
    );
  })
);

// EXPORT ------------------------------------------------------------------

export const FormTextArea = FormTextAreaPresentation;
