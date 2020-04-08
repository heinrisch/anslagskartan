import React from "react";

type ButtonsProps = React.HTMLProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const Buttons: React.FC<ButtonsProps> = React.memo((props) => {
  return <div className="buttons" {...props} />;
});
