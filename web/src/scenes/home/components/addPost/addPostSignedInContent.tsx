import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { Button } from "../../../../components/buttons/button";
import { Buttons } from "../../../../components/buttons/buttons";
import { PrimaryButton } from "../../../../components/buttons/primaryButton";
import {
  Address,
  FormAddressInput,
} from "../../../../components/form/formAddressInput";
import { FormCheckbox } from "../../../../components/form/formCheckbox";
import { FormInput } from "../../../../components/form/formInput";
import { FormTextArea } from "../../../../components/form/formTextArea";
import { Title } from "../../../../components/text/title";
import { useHandleSubmitAddPostCallback } from "../../../../handlers/handleSubmitAddPost";
import { useHandleToggleSidebarViewCallback } from "../../../../handlers/handleToggleSidebarView";
import { AppContext } from "../../../../state/appContext";
import { MapPosition } from "../../../../components/map/mapPosition";
import "./addPost.css";

// CONTAINER ----------------------------------------------------------------

const AddPostSignedInContentContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmitForm = useHandleSubmitAddPostCallback(address);

  const handleAddressChange = React.useCallback(
    (value: Address) => setAddress(value),
    [setAddress]
  );

  const handleCancelClick = useHandleToggleSidebarViewCallback("list");

  return (
    <AddPostSignedInContentPresentation
      mapCenter={state.mapCenter}
      onCancelClick={handleCancelClick}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostSignedInContentPresentationProps = {
  mapCenter: MapPosition;
  onSubmitForm: OnSubmit<Record<string, any>>;
  onCancelClick: () => void;
  onAddressChange: (address: Address) => void;
};

const AddPostSignedInContentPresentation: React.FC<AddPostSignedInContentPresentationProps> = React.memo(
  (props) => {
    const { mapCenter, onAddressChange, onCancelClick, onSubmitForm } = props;
    const { register, handleSubmit } = useForm();

    return (
      <>
        <Title as="h5">Skapa en lapp</Title>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FormInput
            name="title"
            ref={register}
            label="Kort beskrivning / Titel"
          />
          <FormTextArea
            name="description"
            ref={register}
            label="Full beskrivning"
            rows={3}
          />
          <FormTextArea
            name="contactInfo"
            ref={register}
            label="Kontaktinformation"
            rows={3}
          />

          <label className="label" children="Behov" />
          <FormCheckbox ref={register} name="printer" label="3D printer" />
          <FormCheckbox ref={register} name="material" label="Material" />
          <FormCheckbox ref={register} name="food" label="Mat" />
          <FormCheckbox ref={register} name="other" label="Annat" />

          <FormAddressInput
            className="form-field"
            name="address"
            label="Adress"
            onChange={onAddressChange}
            location={mapCenter}
          />

          <Buttons>
            <PrimaryButton type="submit">Lägg till</PrimaryButton>
            <Button onClick={onCancelClick}>Tillbaka till listan</Button>
          </Buttons>
        </form>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPostSignedInContent = AddPostSignedInContentContainer;
