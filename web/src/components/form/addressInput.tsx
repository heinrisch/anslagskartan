import React from "react";
import Geosuggest, { Styles, Suggest } from "react-geosuggest";
import { MapPosition } from "../map/models/mapPosition";
import "./addressInput.css";
import classNames from "classnames";
import { Address } from "./models/address";
import { HtmlInputProps } from "../../models/htmlProps/htmlInputProps";

// CONTAINER ----------------------------------------------------------------

type AddressInputContainerProps = Omit<AddressInputPresentationProps, "onChange"> & {
  onChange: (value: Address) => void;
};

const AddressInputContainer: React.FC<AddressInputContainerProps> = React.memo((props) => {
  const { onChange, ...otherProps } = props;

  const handleSuggestSelect = (event: Suggest) => {
    if (!event) return;

    onChange({
      label: event.label,
      latitude: event.location.lat,
      longitude: event.location.lng,
    });
  };

  return <AddressInputPresentation onChange={handleSuggestSelect} {...otherProps} />;
});

// PRESENTATION -------------------------------------------------------------

type AddressInputPresentationProps = Omit<Omit<HtmlInputProps, "onChange">, "ref"> & {
  ref?: React.RefObject<Geosuggest>;
  style?: Styles;
  fullWidth?: boolean;
  onChange: (value: Suggest) => void;
  location: MapPosition;
};

const AddressInputPresentation: React.FC<AddressInputPresentationProps> = React.memo((props) => {
  const {
    fullWidth,
    label,
    onChange,
    location,
    className,
    placeholder = "",
    ...otherProps
  } = props;

  const inputClassName = classNames("address-input-suggest", "input", {
    "is-fullwidth": fullWidth,
  });

  const mapCenter = new google.maps.LatLng(location.latitude, location.longitude);

  return (
    <Geosuggest
      autoComplete="off"
      country="se"
      location={mapCenter}
      onSuggestSelect={onChange}
      placeholder={placeholder}
      radius={6000}
      inputClassName={inputClassName}
      {...otherProps}
    />
  );
});

// EXPORT ------------------------------------------------------------------

export const AddressInput = AddressInputContainer;
export type AddressInputProps = AddressInputContainerProps;
