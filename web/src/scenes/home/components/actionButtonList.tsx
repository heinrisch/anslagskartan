import { Paper } from "@material-ui/core";
import React from "react";
import { AuthConsumer } from "../../../components/authConsumer/authConsumer";
import { AppContext } from "../../../state/appContext";
import { AddMenuItemButton } from "../../../components/buttons/addMenuItemButton";
import { LoadingButton } from "../../../components/buttons/loadingButton";
import "./actionButtonList.css";

// CONTAINER ----------------------------------------------------------------

const ActionButtonListContainer: React.FC = () => {
  const { dispatch, state } = React.useContext(AppContext);

  const handleOpenAddPostClick = React.useCallback(() => {
    dispatch({ type: "TOGGLE_MENU_IS_OPEN", menuType: "add" });
  }, [dispatch]);

  return (
    <ActionButtonListPresentation
      isLoading={state.loadingAddPost || state.loadingPosts}
      onOpenAddPostClick={handleOpenAddPostClick}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type ActionButtonListPresentationProps = {
  isLoading: boolean;
  onOpenAddPostClick: () => void;
};

const ActionButtonListPresentation: React.FC<ActionButtonListPresentationProps> = (
  props
) => {
  const { isLoading, onOpenAddPostClick } = props;

  const style: React.CSSProperties = {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    zIndex: 1000,
  };

  return (
    <div style={style}>
      <Paper
        className={`action-button-list__paper action-button-list__paper--hidden-${(!isLoading).toString()}`}
      >
        <LoadingButton loading={isLoading} />
      </Paper>

      <Paper className="action-button-list__paper">
        <AuthConsumer className="action-button-list__item" />
        <AddMenuItemButton
          className="action-button-list__item"
          onClick={onOpenAddPostClick}
        />
      </Paper>
    </div>
  );
};

// EXPORT ------------------------------------------------------------------

export const ActionButtonList = ActionButtonListContainer;
