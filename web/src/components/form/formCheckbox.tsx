import React from "react";
import classNames from "classnames";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";

// PRESENTATION -------------------------------------------------------------

type FormCheckboxPresentationProps = HtmlInputProps & {
  readonly label: string;
};

const FormCheckboxPresentation: React.FC<FormCheckboxPresentationProps> = React.memo((props) => {
  const { label, className, ...otherProps } = props;
  const fieldClassName = classNames("field", className);

  return (
    <div className={fieldClassName}>
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" {...otherProps} /> {label}
        </label>
      </div>
    </div>
  );
});

// EXPORT ------------------------------------------------------------------

export const FormCheckbox = FormCheckboxPresentation;
