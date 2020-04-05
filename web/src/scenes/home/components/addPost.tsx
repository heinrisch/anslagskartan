import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { OnSubmit, useForm } from "react-hook-form";
import {
  Address,
  AddressInput,
} from "../../../components/addressInput/addressInput";
import { MapPosition } from "../../../components/map/models/mapPosition";
import { Post, TaskResponse } from "../../../models/post";
import { AppContext } from "../../../state/appContext";
import { addPosts } from "../../../utils/http/addPost";
import { fetchPosts } from "../../../utils/http/fetchPosts";
import "./addPost.css";
import { AuthContentSwitch } from "./authContentSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import { FacebookUser } from "../../../state/appState";

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

  const handleSignInClick = React.useCallback(() => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then((result) => {
        const { credential, user } = result;

        console.log("got credential", credential);
        console.log("got user", user);
      })
      .catch((error) => {
        var { code, message, email, credential } = error;

        console.error("got error", code, message, email, credential, error);
      });
  }, []);

  return (
    <AddPostPresentation
      mapCenter={state.mapCenter}
      user={state.user}
      onSignInClick={handleSignInClick}
      onCancelClick={handleCancelClick}
      onSubmitForm={handleSubmitForm}
      onAddressChange={handleAddressChange}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type AddPostPresentationProps = {
  mapCenter: MapPosition;
  user: FacebookUser | null;
  onSignInClick: () => void;
  onSubmitForm: OnSubmit<Record<string, any>>;
  onCancelClick: () => void;
  onAddressChange: (address: Address) => void;
};

const AddPostPresentation: React.FC<AddPostPresentationProps> = React.memo(
  (props) => {
    const {
      onSubmitForm,
      onAddressChange,
      mapCenter,
      onCancelClick,
      onSignInClick,
      user,
    } = props;

    const { register, handleSubmit, errors } = useForm();

    const signedInContent = (
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

    const signedOutContent = (
      <>
        <strong>Logga in med Facebook för att fortsätta</strong>
        <p>
          Får att göra den här tjänsten användbar och säker, både för de som
          behöver hjälp och för de som vill hjälpa till, behöver vi identifiera
          er. För närvarandet är Facebook den enklaste och snabbaste lösningen.
        </p>

        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={onSignInClick}>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{
                color: "#4267B2",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            />
            Logga in med Facebook
          </Button>
        </div>

        <br />
        <br />
        <a href="#">Läs mer om hur och varför vi använder Facebook</a>

        <br />
        <br />

        <div style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={onCancelClick}>
            Tillbaka till listan
          </Button>
        </div>
      </>
    );

    return (
      <AuthContentSwitch
        signedInContent={signedInContent}
        signedOutContent={signedOutContent}
      />
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const AddPost = AddPostContainer;
