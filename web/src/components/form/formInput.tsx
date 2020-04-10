import React from "react";
import classNames from "classnames";

type FormInputProps = React.HTMLProps<HTMLInputElement> &
  React.HTMLAttributes<HTMLInputElement> & {
    label: string;
    fullWidth?: boolean;
  };

export const FormInput: React.FC<FormInputProps> = React.memo((props) => {
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
