import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { Button } from "../../../components/buttons/button";
import { Buttons } from "../../../components/buttons/buttons";
import { PrimaryButton } from "../../../components/buttons/primaryButton";
import {
  Address,
  FormAddressInput,
} from "../../../components/formAddressInput";
import { FormCheckbox } from "../../../components/formCheckbox";
import { FormInput } from "../../../components/formInput";
import { FormTextArea } from "../../../components/formTextArea";
import { Title } from "../../../components/title";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { Post, TaskResponse } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import { fetchPosts } from "../../../utils/http/fetchPosts";
import { MapPosition } from "../models/mapPosition";
import "./addPost.css";

// CONTAINER ----------------------------------------------------------------

const AddPostSignedInContentContainer: React.FC = React.memo(() => {
  const { dispatch, state } = React.useContext(AppContext);

  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmitForm: OnSubmit<Record<string, any>> = React.useCallback(
    (data) => {
      dispatch({ type: "ADD_POST_PENDING" });

      if (state.userId === null) {
        throw new Error("User is not logged in");
      }

      addPosts(state.userId, {
        title: data.title,
        location: {
          lat: address.latitude,
          lng: address.longitude,
        },
        data: {
          address: address.label,
          description: data.description,
          contactInfo: data.contactInfo,
          needs: [
            data.printer ? "3D printer" : "",
            data.material ? "Material" : "",
            data.food ? "Mat" : "",
            data.other ? "Annat" : "",
          ]
            .filter((x) => x.length > 0)
            .join(","),
        },
      })
        .then((postResponse: TaskResponse) => {
          fetchPosts().then((posts) => {
            const post: Post = posts.filter(
              (p) => p.id === postResponse.taskId
            )[0];
            dispatch({ type: "ADD_POST_RECEIVED", post });
          });
        })
        .catch((e) => {
          console.log("error in posting post", e);
          dispatch({ type: "ADD_POST_REJECTED" });
        });
    },
    [dispatch, address, state.userId]
  );

  const handleAddressChange = React.useCallback(
    (value: Address) => setAddress(value),
    [setAddress]
  );

  const handleCancelClick = useHandleToggleSidebarViewCallback(
    dispatch,
    "list"
  );

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

            <Button type="button" onClick={onCancelClick}>
              Tillbaka till listan
            </Button>
          </Buttons>
        </form>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPostSignedInContent = AddPostSignedInContentContainer;
