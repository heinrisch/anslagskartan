import React from "react";
import { useForm, OnSubmit } from "react-hook-form";
import { Button, TextField, Typography } from "@material-ui/core";
import { AddressInput, Address } from "../addressInput/addressInput";
import { AppContext } from "../../state/appContext";
import { addPosts } from "../../utils/http/addPost";
import { Post } from "../../models/post";

export const AddMenuItem: React.FC = React.memo(() => {
  const { dispatch } = React.useContext(AppContext);

  const { register, handleSubmit, errors } = useForm();
  const [address, setAddress] = React.useState<Address>({
    label: "",
    latitude: 0,
    longitude: 0,
  });

  const onSubmit: OnSubmit<Record<string, any>> = (data) => {
    dispatch({ type: "ADD_POST_PENDING" });
    addPosts({
      address: address.label,
      title: data.title,
      description: data.description,
      position: address,
    })
      .then((post: Post) => {
        return dispatch({ type: "ADD_POST_RECEIVED", payload: post });
      })
      .catch(() => dispatch({ type: "ADD_POST_REJECTED" }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Skapa en lapp
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="title"
          inputRef={register}
          label="Titel"
          variant="outlined"
          fullWidth
        />

        <br />
        <br />

        <TextField
          name="description"
          inputRef={register}
          label="Beskrivning"
          variant="outlined"
          rows={3}
          fullWidth
          multiline
        />

        <br />
        <br />

        <AddressInput
          name="address"
          ref={register}
          label="Adress"
          variant="outlined"
          onChange={(value: Address) => setAddress(value)}
          fullWidth
        />

        <br />
        <br />

        <Button type="submit" variant="contained" color="primary">
          Lägg till
        </Button>
      </form>
    </div>
  );
});
