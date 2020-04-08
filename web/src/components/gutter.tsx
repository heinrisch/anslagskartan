import React from "react";

type GutterProps = React.HTMLProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    size?: 1 | 2 | 3;
  };

export const Gutter: React.FC<GutterProps> = React.memo((props) => {
  const { size = 1, ...otherProps } = props;
  const style: React.CSSProperties = { marginBottom: `${size}rem` };

  return <div style={style} {...otherProps} />;
});
