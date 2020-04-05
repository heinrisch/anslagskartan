import {
  Button,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { Post, TaskResponse } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import { fetchPosts } from "../../../utils/http/fetchPosts";
import { MapPosition } from "../models/mapPosition";
import "./addPost.css";
import { Address, AddressInput } from "./addressInput";

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

      console.log("data", data);

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
          ].join(","),
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
        <Typography variant="h5" gutterBottom>
          Skapa en lapp
        </Typography>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            className="form-field"
            name="title"
            inputRef={register}
            label="Kort beskrivning / Titel"
            variant="outlined"
            fullWidth
          />
          <TextField
            className="form-field"
            name="description"
            inputRef={register}
            label="Full beskrivning"
            variant="outlined"
            rows={3}
            fullWidth
            multiline
          />
          <TextField
            className="form-field"
            name="contactInfo"
            inputRef={register}
            label="Kontaktinformation"
            variant="outlined"
            rows={3}
            fullWidth
            multiline
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Behov</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox inputRef={register} name="printer" />}
                label="3D printer"
              />
              <FormControlLabel
                control={<Checkbox inputRef={register} name="material" />}
                label="Material"
              />
              <FormControlLabel
                control={<Checkbox inputRef={register} name="food" />}
                label="Mat"
              />
              <FormControlLabel
                control={<Checkbox inputRef={register} name="other" />}
                label="Annat"
              />
            </FormGroup>
          </FormControl>

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
          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Lägg till
            </Button>

            <br />
            <br />

            <Button type="button" variant="contained" onClick={onCancelClick}>
              Tillbaka till listan
            </Button>
          </div>
        </form>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPostSignedInContent = AddPostSignedInContentContainer;
