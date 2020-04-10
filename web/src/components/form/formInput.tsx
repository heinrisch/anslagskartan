import React from "react";
import classNames from "classnames";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";

// PRESENTATION -------------------------------------------------------------

type FormInputPresentationProps = HtmlInputProps & {
  readonly label: string;
  readonly fullWidth?: boolean;
};

const FormInputPresentation: React.FC<FormInputPresentationProps> = React.memo((props) => {
  const { label, className, fullWidth, name, ...otherProps } = props;
  const fieldClassName = classNames("field", className);
  const inputClassName = classNames("input", { "is-fullwidth": fullWidth });

  return (
    <div className={fieldClassName}>
      <label className="label" children={label} />
      <div className="control">
        <input className={inputClassName} name={name} {...otherProps} />
      </div>
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormInput = FormInputPresentation;
