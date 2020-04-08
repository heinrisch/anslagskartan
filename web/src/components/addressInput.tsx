import React from "react";
import Geosuggest, { Styles, Suggest } from "react-geosuggest";
import { MapPosition } from "../scenes/home/models/mapPosition";
import "./addressInput.css";
import classNames from "classnames";

export type Address = {
  readonly label: string;
  readonly latitude: number;
  readonly longitude: number;
};

type AddressInputProps = Omit<
  Omit<React.HTMLProps<HTMLInputElement>, "onChange">,
  "ref"
> &
  Omit<Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">, "ref"> & {
    ref?: React.RefObject<Geosuggest>;
    style?: Styles;
    label: string;
    fullWidth?: boolean;
    onChange: (value: Address) => void;
    location: MapPosition;
  };

export const AddressInput: React.FC<AddressInputProps> = React.memo((props) => {
  const {
    fullWidth,
    label,
    onChange,
    location,
    className,
    ...otherProps
  } = props;

  const fieldClassName = classNames("field", className);
  const inputClassName = classNames("address-input-suggest", "input", {
    "is-fullwidth": fullWidth,
  });

  const handleSuggestSelect = (event: Suggest) => {
    if (!event) return;

    onChange({
      label: event.label,
      latitude: event.location.lat,
      longitude: event.location.lng,
    });
  };

  const mapCenter = new google.maps.LatLng(
    location.latitude,
    location.longitude
  );

  return (
    <div className={fieldClassName}>
      <label className="label" children={label} />
      <div className="control"></div>
      <Geosuggest
        id="my-input"
        aria-describedby="my-helper-text"
        autoComplete="off"
        country="se"
        location={mapCenter}
        onSuggestSelect={handleSuggestSelect}
        placeholder=""
        radius={6000}
        inputClassName={inputClassName}
        {...otherProps}
      />
    </div>
  );
});
