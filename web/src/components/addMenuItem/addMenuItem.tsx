import React from "react";
import { useForm, OnSubmit } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";

export const AddMenuItem: React.FC = React.memo(() => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit: OnSubmit<Record<string, any>> = (data) => {
    console.log(data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="description"
          ref={register}
          label="Beskrivning"
          rows={2}
          fullWidth
          multiline
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
