import React from "react";
import classNames from "classnames";

type CheckboxProps = React.HTMLProps<HTMLInputElement> &
  React.HTMLAttributes<HTMLInputElement> & {
    label: string;
  };

export const Checkbox: React.FC<CheckboxProps> = React.memo((props) => {
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
