import React from "react";
import { useForm, OnSubmit } from "react-hook-form";
import { Button, TextField, Typography } from "@material-ui/core";
import {
  AddressInput,
  Address,
} from "../../../components/addressInput/addressInput";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import { Post } from "../../../models/post";

// CONTAINER ----------------------------------------------------------------

const AddPostContainer: React.FC = React.memo(() => {
  const { dispatch } = React.useContext(AppContext);

  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmitForm: OnSubmit<Record<string, any>> = React.useCallback(
    (data) => {
      dispatch({ type: "ADD_POST_PENDING" });

      addPosts({
        address: address.label,
        title: data.title,
        description: data.description,
        position: address,
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
      address={address}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostPresentationProps = {
  address: Address;
  onSubmitForm: OnSubmit<Record<string, any>>;
  onAddressChange: (address: Address) => void;
};

const AddPostPresentation: React.FC<AddPostPresentationProps> = React.memo(
  (props) => {
    const { address, onSubmitForm, onAddressChange } = props;

    const { register, handleSubmit, errors } = useForm();

    return (
      <div style={{ padding: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          Skapa en lapp
        </Typography>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            name="title"
            inputRef={register}
            label="Titel"
            variant="outlined"
            fullWidth
          />

          <TextField
            name="description"
            inputRef={register}
            label="Beskrivning"
            variant="outlined"
            rows={3}
            fullWidth
            multiline
          />

          <AddressInput
            name="address"
            ref={register}
            label="Adress"
            variant="outlined"
            onChange={onAddressChange}
            value={address.label}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Lägg till
          </Button>
        </form>
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPost = AddPostContainer;
