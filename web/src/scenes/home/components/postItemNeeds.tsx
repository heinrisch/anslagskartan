import React from "react";
import { Chip } from "@material-ui/core";

// PRESENTATION -------------------------------------------------------------

type PostItemNeedsProps = {
  needs: string[];
};

export const PostItemNeedsPresentation: React.FC<PostItemNeedsProps> = React.memo(
  (props) => {
    const { needs } = props;
    return (
      <div style={{ fontSize: "0.7rem" }}>
        Behöver{" "}
        {needs.map((need) => (
          <Chip
            style={{
              fontSize: "0.7rem",
              height: "1rem",
              marginRight: "0.2rem",
            }}
            size="small"
            color="secondary"
            label={need}
          />
        ))}
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostItemNeeds = PostItemNeedsPresentation;
