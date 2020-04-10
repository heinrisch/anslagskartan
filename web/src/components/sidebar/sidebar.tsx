import React from "react";
import { SidebarToggle } from "./sidebarToggle";
import { Card } from "../card";

type SidebarProps = {
  readonly open: boolean;
  readonly width?: number;
  readonly onToggleOpen: () => void;
};

export const Sidebar: React.FC<SidebarProps> = React.memo((props) => {
  const { children, onToggleOpen, open, width = 320 } = props;

  const style: React.CSSProperties = {
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    top: 0,
    width: `${width}px`,
    zIndex: 1000,
  };

  return (
    <Card style={style} innerStyle={{ padding: 0 }} {...props}>
      <SidebarToggle isOpen={open} onToggle={onToggleOpen} width={width} />
      {children}
    </Card>
  );
});
