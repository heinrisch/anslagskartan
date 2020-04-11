import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "../../../components/buttons/button";
import { FacebookButton } from "../../../components/buttons/facebookButton";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { useHandleUserSignInClickCallback } from "../../../handlers/handleUserSignInClick";
import { Title } from "../../../components/text/title";
import "./facebookSignInNotification.css";
import { Card } from "../../../components/card";
import { LinkButton } from "../../../components/buttons/linkButton";

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
      <>
        <Card className="with-gutter-half">
          <LinkButton onClick={onCancelClick}>{"<"} Tillbaka till listan</LinkButton>
        </Card>

        <Card>
          <Title as="h6" withGutter={true}>
            Logga in med Facebook för att fortsätta
          </Title>

          <p className="with-gutter-one">
            Får att göra den här tjänsten användbar och säker, både för de som behöver hjälp och för
            de som vill hjälpa till, behöver vi identifiera er. För närvarandet är Facebook den
            enklaste och snabbaste lösningen.
          </p>

          <div className="is-centered">
            <FacebookButton onClick={onSignInClick} withGutter={1}>
              <FontAwesomeIcon icon={faFacebookSquare} className="facebook-icon" />
              Logga in med Facebook
            </FacebookButton>
          </div>
        </Card>
      </>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const FacebookSignInNotification = FacebookSignInNotificationContainer;
