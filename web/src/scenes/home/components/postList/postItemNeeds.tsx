import React from "react";
import { Tag } from "../../../../components/tag";
import "./postItemNeeds.css";

// PRESENTATION -------------------------------------------------------------

type PostItemNeedsProps = {
  readonly needs: string[];
};

export const PostItemNeedsPresentation: React.FC<PostItemNeedsProps> = React.memo((props) => {
  const { needs } = props;

  const renderedTags = needs
    .filter((x) => x.length > 0)
    .map((need) => <Tag className="post-item-needs-tag" key={need} children={need} />);

  if (renderedTags.length === 0) {
    return null;
  }

  return <div className="post-item-needs">Behöver {renderedTags}</div>;
});

// EXPORT ------------------------------------------------------------------

export const PostItemNeeds = PostItemNeedsPresentation;
