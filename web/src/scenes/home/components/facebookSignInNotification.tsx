import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React from "react";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { useHandleUserSignInClickCallback } from "../../../handlers/handleUserSignInClick";
import { AppContext } from "../../../state/appContext";
import "./addPost.css";

// CONTAINER ----------------------------------------------------------------

const FacebookSignInNotificationContainer: React.FC = React.memo(() => {
  const { dispatch } = React.useContext(AppContext);

  const handleCancelClick = useHandleToggleSidebarViewCallback(
    dispatch,
    "list"
  );
  const handleSignInClick = useHandleUserSignInClickCallback();

  return (
    <FacebookSignInNotificationPresentation
      onSignInClick={handleSignInClick}
      onCancelClick={handleCancelClick}
    />
  );
});

// PRESENTATION -------------------------------------------------------------

type FacebookSignInNotificationPresentationProps = {
  onSignInClick: () => void;
  onCancelClick: () => void;
};

const FacebookSignInNotificationPresentation: React.FC<FacebookSignInNotificationPresentationProps> = React.memo(
  (props) => {
    const { onCancelClick, onSignInClick } = props;

    return (
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
  }
);

// EXPORT ------------------------------------------------------------------

export const FacebookSignInNotification = FacebookSignInNotificationContainer;
