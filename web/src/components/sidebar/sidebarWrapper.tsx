import React from "react";

export const SidebarWrapper: React.FC = React.memo((props) => {
  return <div id="outer-container" style={{ height: "100%" }} {...props} />;
});
