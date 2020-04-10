import React from "react";
import "./addressInput.css";
import classNames from "classnames";
import { AddressInput, AddressInputProps } from "./addressInput";

// PRESENTATION -------------------------------------------------------------

type FormAddressInputPresentationProps = AddressInputProps & {
  readonly label: string;
};

const FormAddressInputPresentation: React.FC<FormAddressInputPresentationProps> = React.memo(
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

// EXPORT ------------------------------------------------------------------

export const FormAddressInput = FormAddressInputPresentation;
