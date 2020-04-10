import React from "react";
import "./addressInput.css";
import classNames from "classnames";
import { AddressInput, AddressInputProps } from "./addressInput";

export type Address = {
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
};

type FormAddressInputProps = AddressInputProps & {
  label: string;
};

export const FormAddressInput: React.FC<FormAddressInputProps> = React.memo(
  (props) => {
    const { label, className, ...otherProps } = props;
    const fieldClassName = classNames("field", className);

    return (
      <div className={fieldClassName}>
        <label className="label" children={label} />
        <div className="control"></div>
        <AddressInput {...otherProps} />
      </div>
    );
  }
);
