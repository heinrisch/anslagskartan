import React from "react";
import { SidebarToggle } from "./sidebarToggle";
import { Card } from "../card";
import "./sidebar.css";

type SidebarProps = {
  readonly open: boolean;
  readonly width?: number;
  readonly onToggleOpen: () => void;
};

export const Sidebar: React.FC<SidebarProps> = React.memo((props) => {
  const { children, onToggleOpen, open, width = 320 } = props;

  const style: React.CSSProperties = {
    width: `${width}px`,
  };

  return (
    <div className="sidebar" style={style} {...props}>
      <SidebarToggle isOpen={open} onToggle={onToggleOpen} width={width} />
      {children}
    </div>
  );
});
