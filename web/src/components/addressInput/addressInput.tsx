import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import Geosuggest, { Suggest } from "react-geosuggest";
import "./addressInput.css";

export type Address = {
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
};

type AddressInputProps = Omit<TextFieldProps, "onChange"> & {
  readonly label: string;
  readonly onChange: (value: Address) => void;
  readonly value: string;
};

export const AddressInput: React.FC<AddressInputProps> = React.memo((props) => {
  const { label, onChange, value, ...otherProps } = props;
  const inputRef = React.useRef<Geosuggest>(null);
  const inputRef2 = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState("");

  const handleSuggestSelect = (event: Suggest) => {
    if (!event) return;

    onChange({
      label: event.label,
      latitude: event.location.lat,
      longitude: event.location.lng,
    });
  };

  const handleInputChange = (event: any) => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }

    if (inputRef2 && inputRef2.current) {
      inputRef2.current.focus();
    }

    setInputValue(event.currentTarget.value);
  };

  const stockholm = new google.maps.LatLng(59.329323, 18.068581);

  return (
    <>
      <TextField
        name="address"
        label={label}
        variant="outlined"
        onChange={handleInputChange}
        inputRef={inputRef2}
        autoComplete="off"
        fullWidth
      />
      <Geosuggest
        id="my-input"
        aria-describedby="my-helper-text"
        autoComplete="off"
        country="se"
        location={stockholm}
        onSuggestSelect={handleSuggestSelect}
        placeholder=""
        radius={6000}
        initialValue={inputValue}
        inputClassName="address-input-suggest"
        ref={inputRef}
      />
    </>
  );
});
