import React from "react";
import { PrimaryButton } from "../../../../components/buttons/primaryButton";
import { useHandleToggleSidebarViewCallback } from "../../../../handlers/handleToggleSidebarView";
import "./postListFooter.css";

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
      <div className="post-list-footer">
        <div className="post-list-footer-item">
          <PrimaryButton
            className="post-list-footer-item-button"
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
