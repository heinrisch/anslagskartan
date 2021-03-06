import React from "react";
import { LoadingIcon } from "../../../../components/loadingIcon";
import { AppContext } from "../../../../state/appContext";
import "./actionButtonList.css";
import { Card } from "../../../../components/card";

// CONTAINER ----------------------------------------------------------------

const ActionButtonListContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return <ActionButtonListPresentation isLoading={state.loadingAddPost || state.loadingPosts} />;
};

// PRESENTATION -------------------------------------------------------------

type ActionButtonListPresentationProps = {
  readonly isLoading: boolean;
};

const ActionButtonListPresentation: React.FC<ActionButtonListPresentationProps> = (props) => {
  const { isLoading } = props;

  const className = [
    "action-button-list__paper",
    `action-button-list__paper--hidden-${(!isLoading).toString()}`,
  ].join(" ");

  return (
    <div className="action-button-list">
      <Card className={className}>
        <LoadingIcon loading={isLoading} />
      </Card>
    </div>
  );
};

// EXPORT ------------------------------------------------------------------

export const ActionButtonList = ActionButtonListContainer;
