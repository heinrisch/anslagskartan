import React from "react";
import classNames from "classnames";

type FormCheckboxProps = React.HTMLProps<HTMLInputElement> &
  React.HTMLAttributes<HTMLInputElement> & {
    label: string;
  };

export const FormCheckbox: React.FC<FormCheckboxProps> = React.memo((props) => {
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
