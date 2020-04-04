import React from "react";
import { useForm, OnSubmit } from "react-hook-form";
import { Button, TextField, Typography } from "@material-ui/core";

export const AddMenuItem: React.FC = React.memo(() => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit: OnSubmit<Record<string, any>> = (data) => {
    console.log(data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Skapa en lapp
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="description"
          ref={register}
          label="Beskrivning"
          variant="outlined"
          rows={3}
          fullWidth
          multiline
        />

        <br />
        <br />

        <TextField
          name="address"
          ref={register}
          label="Adress"
          variant="outlined"
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
