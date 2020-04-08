import React from "react";
import classNames from "classnames";

type CardProps = React.HTMLProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = React.memo((props) => {
  const { children, className, ...otherProps } = props;
  const cardClassName = classNames("card", className);

  return (
    <div className={cardClassName} {...otherProps}>
      <div className="card-content" children={children} />
    </div>
  );
});
