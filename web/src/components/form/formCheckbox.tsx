import React from "react";
import classNames from "classnames";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";

// PRESENTATION -------------------------------------------------------------

type FormCheckboxPresentationProps = Omit<HtmlInputProps, "ref"> & {
  readonly label: string;
  readonly reference?:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
};

const FormCheckboxPresentation: React.FC<FormCheckboxPresentationProps> = React.memo(
  React.forwardRef((props) => {
    const { label, className, reference, ...otherProps } = props;
    const fieldClassName = classNames("field", className);

    return (
      <div className={fieldClassName}>
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" ref={reference} {...otherProps} /> {label}
          </label>
        </div>
      </div>
    );
  })
);

// EXPORT ------------------------------------------------------------------

export const FormCheckbox = FormCheckboxPresentation;
