import React from "react";
import { AddressInput, AddressInputProps } from "./addressInput";
import "./addressInput.css";
import { FormField } from "./formField";

// PRESENTATION -------------------------------------------------------------

type FormAddressInputPresentationProps = AddressInputProps & {
  readonly label: string;
};

const FormAddressInputPresentation: React.FC<FormAddressInputPresentationProps> = React.memo(
  (props) => {
    const { label, className, ...otherProps } = props;

    return (
      <FormField label={label}>
        <AddressInput {...otherProps} />
      </FormField>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const FormAddressInput = FormAddressInputPresentation;
