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
      profileImageUrl={state.user?.photoURL}
      isLoading={state.loadingAddPost || state.loadingPosts}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type ActionButtonListPresentationProps = {
  isLoading: boolean;
  profileImageUrl: string | undefined;
};

const ActionButtonListPresentation: React.FC<ActionButtonListPresentationProps> = (
  props
) => {
  const { isLoading, profileImageUrl } = props;

  const style: React.CSSProperties = {
    position: "absolute",
    right: "1rem",
    top: "1rem",
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
      {/* <Paper className={className}>
        <img src={profileImageUrl} alt="facebook avatar" />
      </Paper> */}
    </div>
  );
};

// EXPORT ------------------------------------------------------------------

export const ActionButtonList = ActionButtonListContainer;
