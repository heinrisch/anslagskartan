import React from "react";
import { Tag } from "../../../../components/tag";

// PRESENTATION -------------------------------------------------------------

type PostItemNeedsProps = {
  readonly needs: string[];
};

export const PostItemNeedsPresentation: React.FC<PostItemNeedsProps> = React.memo((props) => {
  const { needs } = props;

  const tagStyle = {
    fontSize: "0.7rem",
    height: "1rem",
    marginRight: "0.2rem",
  };

  const renderedTags = needs
    .filter((x) => x.length > 0)
    .map((need) => <Tag style={tagStyle} key={need} children={need} />);

  if (renderedTags.length === 0) {
    return null;
  }

  return <div style={{ fontSize: "0.7rem" }}>Behöver {renderedTags}</div>;
});

// EXPORT ------------------------------------------------------------------

export const PostItemNeeds = PostItemNeedsPresentation;
