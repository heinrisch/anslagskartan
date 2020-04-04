import React, { useState } from "react";
import { reveal as Menu, State as MenuState } from "react-burger-menu";
import { OpenMenuButton } from "../../components/buttons/openMenuButton";
import { Map } from "../../components/map/map";
import { SideMenuItem } from "../../components/sideMenu/sideMenuItem";
import { hardCodedPositions } from "../../utils/hardCodedPositions";

export const HomeScenePresentation: React.FC = React.memo(() => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuOpenClick = () => setMenuIsOpen(!menuIsOpen);
  const handleMenuStateChange = (state: MenuState) =>
    setMenuIsOpen(state.isOpen);

  const renderedMenuItems = hardCodedPositions.map((position, index) => (
    <SideMenuItem key={index}>{position.name}</SideMenuItem>
  ));

  return (
    <div id="outer-container" style={{ height: "100%" }}>
      <Menu
        pageWrapId="page-wrap"
        isOpen={menuIsOpen}
        onStateChange={handleMenuStateChange}
      >
        {renderedMenuItems}
      </Menu>
      <main id="page-wrap">
        <OpenMenuButton onClick={handleMenuOpenClick} />
        <Map
          defaultCenter={{ latitude: 59.310519, longitude: 18.057875 }}
          defaultZoom={13}
          markers={[]}
        />
      </main>
    </div>
  );
});
