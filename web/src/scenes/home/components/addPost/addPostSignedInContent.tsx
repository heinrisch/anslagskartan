import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { PrimaryButton } from "../../../../components/buttons/primaryButton";
import { FormAddressInput } from "../../../../components/form/formAddressInput";
import { FormCheckbox } from "../../../../components/form/formCheckbox";
import { FormInput } from "../../../../components/form/formInput";
import { FormTextArea } from "../../../../components/form/formTextArea";
import { TitlePresentation } from "../../../../components/text/title";
import { useHandleSubmitAddPostCallback } from "../../../../handlers/handleSubmitAddPost";
import { useHandleToggleSidebarViewCallback } from "../../../../handlers/handleToggleSidebarView";
import { AppContext } from "../../../../state/appContext";
import { MapPosition } from "../../../../components/map/models/mapPosition";
import "./addPost.css";
import { Address } from "../../../../components/form/models/address";
import { LinkButton } from "../../../../components/buttons/linkButton";
import { Card } from "../../../../components/card";

// CONTAINER ----------------------------------------------------------------

const AddPostSignedInContentContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmitForm = useHandleSubmitAddPostCallback(address);

  const handleAddressChange = React.useCallback((value: Address) => setAddress(value), [
    setAddress,
  ]);

  const handleCancelClick = useHandleToggleSidebarViewCallback("list");

  return (
    <AddPostSignedInContentPresentation
      mapCenter={state.mapCenter}
      onCancelClick={handleCancelClick}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
      loading={state.loadingAddPost}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostSignedInContentPresentationProps = {
  readonly loading: boolean;
  readonly mapCenter: MapPosition;
  readonly onSubmitForm: OnSubmit<Record<string, any>>;
  readonly onCancelClick: () => void;
  readonly onAddressChange: (address: Address) => void;
};

const AddPostSignedInContentPresentation: React.FC<AddPostSignedInContentPresentationProps> = React.memo(
  (props) => {
    const { mapCenter, onAddressChange, onCancelClick, onSubmitForm, loading } = props;
    const { register, handleSubmit } = useForm();

    return (
      <>
        <Card className="with-gutter-half">
          <LinkButton onClick={onCancelClick}>{"<"} Tillbaka till listan</LinkButton>
        </Card>

        <Card>
          <TitlePresentation as="h5" withGutter={true}>
            Skapa en lapp
          </TitlePresentation>

          <form onSubmit={handleSubmit(onSubmitForm)}>
            <FormInput name="title" ref={register} label="Kort beskrivning / Titel" />
            <FormTextArea name="description" ref={register} label="Full beskrivning" rows={3} />
            <FormTextArea name="contactInfo" ref={register} label="Kontaktinformation" rows={3} />

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

            <PrimaryButton type="submit" fullWidth={true} loading={loading}>
              Lägg till
            </PrimaryButton>
          </form>
        </Card>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPostSignedInContent = AddPostSignedInContentContainer;
