import React from "react";
import { Tag } from "../../../components/tag";

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
          <Tag
            style={{
              fontSize: "0.7rem",
              height: "1rem",
              marginRight: "0.2rem",
            }}
            key={need}
            children={need}
          />
        ))}
      </div>
    );
  }
);

// EXPORT ------------------------------------------------------------------

export const PostItemNeeds = PostItemNeedsPresentation;
