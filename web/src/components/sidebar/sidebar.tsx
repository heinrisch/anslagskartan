import React from "react";
import "./sidebar.css";
import { SidebarToggle } from "./sidebarToggle";

type SidebarProps = {
  readonly open: boolean;
  readonly width?: number;
  readonly onToggleOpen: () => void;
};

export const Sidebar: React.FC<SidebarProps> = React.memo((props) => {
  const { children, onToggleOpen, open, width = 320, ...otherProps } = props;

  const style: React.CSSProperties = {
    width: `${width}px`,
  };

  return (
    <div className="sidebar" style={style} {...otherProps}>
      <SidebarToggle isOpen={open} onToggle={onToggleOpen} width={width} />
      {children}
    </div>
  );
});
