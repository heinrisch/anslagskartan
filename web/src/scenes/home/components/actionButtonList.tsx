import { Paper } from "@material-ui/core";
import React from "react";
import { LoadingButton } from "./loadingButton";
import { AppContext } from "../../../state/appContext";
import "./actionButtonList.css";

// CONTAINER ----------------------------------------------------------------

const ActionButtonListContainer: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return (
    <ActionButtonListPresentation
      isLoading={state.loadingAddPost || state.loadingPosts}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type ActionButtonListPresentationProps = {
  isLoading: boolean;
};

const ActionButtonListPresentation: React.FC<ActionButtonListPresentationProps> = (
  props
) => {
  const { isLoading } = props;

  const style: React.CSSProperties = {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    zIndex: 1000,
  };

  const className = [
    "action-button-list__paper",
    `action-button-list__paper--hidden-${(!isLoading).toString()}`,
  ].join(" ");

  return (
    <div style={style}>
      <Paper className={className}>
        <LoadingButton loading={isLoading} />
      </Paper>
    </div>
  );
};

// EXPORT ------------------------------------------------------------------

export const ActionButtonList = ActionButtonListContainer;
