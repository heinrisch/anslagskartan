import React from "react";
import classNames from "classnames";

type FormTextAreaProps = React.HTMLProps<HTMLTextAreaElement> &
  React.HTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    name?: string;
  };

export const FormTextArea: React.FC<FormTextAreaProps> = React.memo((props) => {
  const { label, className, name, ...otherProps } = props;
  const fieldClassName = classNames("field", className);

  return (
    <div className={fieldClassName}>
      <label className="label" children={label} />
      <div className="control">
        <textarea className="textarea" name={name} {...otherProps} />
      </div>
    </div>
  );
});