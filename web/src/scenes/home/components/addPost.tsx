import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import {
  Address,
  AddressInput,
} from "../../../components/addressInput/addressInput";
import { MapPosition } from "../../../components/map/models/mapPosition";
import {
  BackendLocation,
  BackendPostData,
  BackendPostResponse,
  Post,
  TaskResponse,
} from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import "./addPost.css";
import { fetchPosts } from "../../../utils/http/fetchPosts";

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
        title: data.title,
        location: {
          lat: address.latitude,
          lng: address.longitude,
        },
        data: {
          address: address.label,
          description: data.description,
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
    [dispatch, address]
  );

  const handleAddressChange = React.useCallback(
    (value: Address) => setAddress(value),
    [setAddress]
  );

  const handleCancelClick = React.useCallback(() => {
    dispatch({ type: "TOGGLE_MENU_IS_OPEN", menuType: "list" });
  }, [dispatch]);

  return (
    <AddPostPresentation
      mapCenter={state.mapCenter}
      onCancelClick={handleCancelClick}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostPresentationProps = {
  mapCenter: MapPosition;
  onSubmitForm: OnSubmit<Record<string, any>>;
  onCancelClick: () => void;
  onAddressChange: (address: Address) => void;
};

const AddPostPresentation: React.FC<AddPostPresentationProps> = React.memo(
  (props) => {
    const { onSubmitForm, onAddressChange, mapCenter, onCancelClick } = props;

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
            label="Kort beskrivning"
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
          </Button>{" "}
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onCancelClick}
          >
            Avbryt
          </Button>
        </form>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPost = AddPostContainer;
