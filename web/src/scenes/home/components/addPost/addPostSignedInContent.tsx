import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { LinkButton } from "../../../../components/buttons/linkButton";
import { PrimaryButton } from "../../../../components/buttons/primaryButton";
import { Card } from "../../../../components/card";
import { FormAddressInput } from "../../../../components/form/formAddressInput";
import { FormCheckbox } from "../../../../components/form/formCheckbox";
import { FormInput } from "../../../../components/form/formInput";
import { FormTextArea } from "../../../../components/form/formTextArea";
import { Address } from "../../../../components/form/models/address";
import { MapPosition } from "../../../../components/map/models/mapPosition";
import { TitlePresentation } from "../../../../components/text/title";
import { useHandleSubmitAddPostCallback } from "../../../../handlers/handleSubmitAddPost";
import { useHandleToggleSidebarViewCallback } from "../../../../handlers/handleToggleSidebarView";
import { AppContext } from "../../../../state/appContext";
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

export type AddPostFormData = {
  readonly title: string;
  readonly description: string;
  readonly contactInfo: string;
  readonly printer: boolean;
  readonly material: boolean;
  readonly food: boolean;
  readonly other: boolean;
};

type AddPostSignedInContentPresentationProps = {
  readonly loading: boolean;
  readonly mapCenter: MapPosition;
  readonly onSubmitForm: (data: AddPostFormData) => void;
  readonly onCancelClick: () => void;
  readonly onAddressChange: (address: Address) => void;
};

const AddPostSignedInContentPresentation: React.FC<AddPostSignedInContentPresentationProps> = React.memo(
  (props) => {
    const { mapCenter, onAddressChange, onCancelClick, onSubmitForm, loading } = props;
    const { register, errors, handleSubmit } = useForm<AddPostFormData>();

    const tempSubmit = (data: AddPostFormData) => {
      console.log(data);
    };

    return (
      <>
        <Card className="with-gutter-half">
          <LinkButton onClick={onCancelClick}>{"<"} Tillbaka till listan</LinkButton>
        </Card>

        <Card>
          <TitlePresentation as="h5" withGutter={true}>
            Skapa en lapp
          </TitlePresentation>

          <form onSubmit={handleSubmit(tempSubmit)}>
            <FormInput
              error={errors.title !== undefined}
              errorMessage={errors.title && "Detta fält krävs"}
              name="title"
              reference={register({ required: true })}
              label="Kort beskrivning / Titel"
            />

            <FormTextArea
              error={errors.description !== undefined}
              errorMessage={errors.description && "Detta fält krävs"}
              name="description"
              reference={register({ required: true })}
              label="Full beskrivning"
              rows={3}
            />
            <FormTextArea
              error={errors.contactInfo !== undefined}
              errorMessage={errors.contactInfo && "Detta fält krävs"}
              name="contactInfo"
              reference={register({ required: true })}
              label="Kontaktinformation"
              rows={3}
            />

            <label className="label" children="Behov" />
            <FormCheckbox reference={register} name="printer" label="3D printer" />
            <FormCheckbox reference={register} name="material" label="Material" />
            <FormCheckbox reference={register} name="food" label="Mat" />
            <FormCheckbox reference={register} name="other" label="Annat" />

            <FormAddressInput
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
