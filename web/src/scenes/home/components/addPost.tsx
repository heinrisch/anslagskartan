import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import {
  Address,
  AddressInput,
} from "../../../components/addressInput/addressInput";
import { MapPosition } from "../../../components/map/models/mapPosition";
import { Post } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import "./addPost.css";

// CONTAINER ----------------------------------------------------------------

const AddPostContainer: React.FC = React.memo(() => {
  const { dispatch, state } = React.useContext(AppContext);

  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmitForm: OnSubmit<Record<string, any>> = React.useCallback(
    (data) => {
      dispatch({ type: "ADD_POST_PENDING" });

      addPosts({
        id: address.label,
        address: address.label,
        title: data.title,
        description: data.description,
        position: address,
        needs: [],
      })
        .then((post: Post) => dispatch({ type: "ADD_POST_RECEIVED", post }))
        .catch(() => dispatch({ type: "ADD_POST_REJECTED" }));
    },
    [dispatch, address]
  );

  const handleAddressChange = React.useCallback(
    (value: Address) => setAddress(value),
    [setAddress]
  );

  return (
    <AddPostPresentation
      mapCenter={state.mapCenter}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostPresentationProps = {
  mapCenter: MapPosition;
  onSubmitForm: OnSubmit<Record<string, any>>;
  onAddressChange: (address: Address) => void;
};

const AddPostPresentation: React.FC<AddPostPresentationProps> = React.memo(
  (props) => {
    const { onSubmitForm, onAddressChange, mapCenter } = props;

    const { register, handleSubmit, errors } = useForm();

    return (
      <>
        <Typography variant="h5" gutterBottom>
          Skapa en lapp
        </Typography>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            className="form-field"
            name="title"
            inputRef={register}
            label="Titel"
            variant="outlined"
            fullWidth
          />

          <TextField
            className="form-field"
            name="description"
            inputRef={register}
            label="Beskrivning"
            variant="outlined"
            rows={3}
            fullWidth
            multiline
          />

          <AddressInput
            className="form-field"
            name="address"
            ref={register}
            label="Adress"
            variant="outlined"
            onChange={onAddressChange}
            location={mapCenter}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Lägg till
          </Button>
        </form>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPost = AddPostContainer;
