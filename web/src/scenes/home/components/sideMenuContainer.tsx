import React from "react";

export const SideMenuContainer: React.FC = React.memo((props) => {
  const { children } = props;
  return (
    <div id="outer-container" style={{ height: "100%" }}>
      {children}
    </div>
  );
});
