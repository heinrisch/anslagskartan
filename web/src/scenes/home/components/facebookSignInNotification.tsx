import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "../../../components/buttons/button";
import { FacebookButton } from "../../../components/buttons/facebookButton";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { useHandleUserSignInClickCallback } from "../../../handlers/handleUserSignInClick";
import { Title } from "../../../components/text/title";

// CONTAINER ----------------------------------------------------------------

const FacebookSignInNotificationContainer: React.FC = React.memo(() => {
  const handleCancelClick = useHandleToggleSidebarViewCallback("list");
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
  readonly onSignInClick: () => void;
  readonly onCancelClick: () => void;
};

const FacebookSignInNotificationPresentation: React.FC<FacebookSignInNotificationPresentationProps> = React.memo(
  (props) => {
    const { onCancelClick, onSignInClick } = props;

    return (
      <div style={{ padding: "1rem" }}>
        <Title as="h6" withGutter={true}>
          Logga in med Facebook för att fortsätta
        </Title>

        <p className="with-gutter-1">
          Får att göra den här tjänsten användbar och säker, både för de som behöver hjälp och för
          de som vill hjälpa till, behöver vi identifiera er. För närvarandet är Facebook den
          enklaste och snabbaste lösningen.
        </p>

        <div style={{ textAlign: "center" }}>
          <FacebookButton onClick={onSignInClick} withGutter={1}>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{
                marginRight: "1rem",
              }}
            />
            Logga in med Facebook
          </FacebookButton>
        </div>

        <div style={{ textAlign: "center" }}>
          <Button onClick={onCancelClick}>Tillbaka till listan</Button>
        </div>
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const FacebookSignInNotification = FacebookSignInNotificationContainer;
