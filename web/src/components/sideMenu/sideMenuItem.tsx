import React from "react";

export const SideMenuItem: React.FC = React.memo((props) => {
  const { children } = props;

  return (
    <div className="menu-item" style={{ padding: "1rem", cursor: "pointer" }}>
      {children}
    </div>
  );
});
