import React from "react";
import { AppContext } from "../../../state/appContext";
import { useHandleToggleSidebarViewCallback } from "../../../handlers/handleToggleSidebarView";
import { Button } from "../../../components/buttons/button";
import { PrimaryButton } from "../../../components/buttons/primaryButton";

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
          <PrimaryButton
            style={{ height: "100%" }}
            onClick={onAddPostClick}
            size="large"
            fullWidth
          >
            Be om hjälp
          </PrimaryButton>
        </div>
        {/* <div style={{ flexBasis: "0", flex: "1 1 0px" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: "100%", height: "100%", borderRadius: 0 }}
            disableElevation
          >
            Hjälp till
          </Button>
        </div> */}
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostListFooter = PostListFooterContainer;
