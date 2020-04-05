import { Button } from "@material-ui/core";
import React from "react";
import { AppContext } from "../../../state/appContext";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";

// CONTAINER ----------------------------------------------------------------

const PostListFooterContainer: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);

  const handleAddPostClick = useHandleToggleSidebarViewCallback(
    dispatch,
    "add"
  );

  return <PostListFooterPresentation onAddPostClick={handleAddPostClick} />;
};

// PRESENTATION -------------------------------------------------------------

type PostListFooterPresentationProps = {
  onAddPostClick: () => void;
};

const PostListFooterPresentation: React.FC<PostListFooterPresentationProps> = React.memo(
  (props) => {
    const { onAddPostClick } = props;

    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          margin: "0 -1rem",
          width: "100%",
          display: "flex",
        }}
      >
        <div style={{ flexBasis: "0", flex: "1 1 0px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: "100%", height: "100%", borderRadius: 0 }}
            onClick={onAddPostClick}
            disableElevation
          >
            Be om hjälp
          </Button>
        </div>
        <div style={{ flexBasis: "0", flex: "1 1 0px" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: "100%", height: "100%", borderRadius: 0 }}
            disableElevation
          >
            Hjälp till
          </Button>
        </div>
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostListFooter = PostListFooterContainer;
