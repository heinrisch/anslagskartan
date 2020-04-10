import React from "react";
import { PrimaryButton } from "../../../../components/buttons/primaryButton";
import { useHandleToggleSidebarViewCallback } from "../../../../handlers/handleToggleSidebarView";

// CONTAINER ----------------------------------------------------------------

const PostListFooterContainer: React.FC = () => {
  const handleAddPostClick = useHandleToggleSidebarViewCallback("add");

  return <PostListFooterPresentation onAddPostClick={handleAddPostClick} />;
};

// PRESENTATION -------------------------------------------------------------

type PostListFooterPresentationProps = {
  readonly onAddPostClick: () => void;
};

const PostListFooterPresentation: React.FC<PostListFooterPresentationProps> = React.memo(
  (props) => {
    const { onAddPostClick } = props;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <div style={{ flexBasis: "0", flex: "1 1 0px" }}>
          <PrimaryButton style={{ height: "100%" }} onClick={onAddPostClick} size="large" fullWidth>
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
