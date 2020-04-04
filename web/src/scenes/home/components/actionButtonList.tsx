import { Paper } from "@material-ui/core";
import React from "react";
import { AuthConsumer } from "../../../components/authConsumer/authConsumer";
import { OpenMenuButton } from "../../../components/buttons/openMenuButton";
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

  const handleOpenListClick = React.useCallback(() => {
    dispatch({ type: "TOGGLE_MENU_IS_OPEN", menuType: "list" });
  }, [dispatch]);

  return (
    <ActionButtonListPresentation
      isLoading={state.loadingAddPost || state.loadingPosts}
      onOpenListClick={handleOpenListClick}
      onOpenAddPostClick={handleOpenAddPostClick}
    />
  );
};

// PRESENTATION -------------------------------------------------------------

type ActionButtonListPresentationProps = {
  isLoading: boolean;
  onOpenListClick: () => void;
  onOpenAddPostClick: () => void;
};

const ActionButtonListPresentation: React.FC<ActionButtonListPresentationProps> = (
  props
) => {
  const { isLoading, onOpenAddPostClick, onOpenListClick } = props;

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
        <OpenMenuButton
          className="action-button-list__item"
          onClick={onOpenListClick}
        />
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
