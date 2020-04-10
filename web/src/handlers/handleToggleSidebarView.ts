import { MenuType } from "../scenes/home/models/menuType";
import React from "react";
import { AppContext } from "../state/appContext";

export const useHandleToggleSidebarViewCallback = (menuType?: MenuType) => {
  const { dispatch, state } = React.useContext(AppContext);

  return React.useCallback(() => {
    dispatch({
      type: "TOGGLE_MENU_IS_OPEN",
      menuType: menuType || state.menuType,
    });
  }, [dispatch, state.menuType, menuType]);
};
