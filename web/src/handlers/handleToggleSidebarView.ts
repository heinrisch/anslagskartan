import { MenuType } from "../scenes/home/models/menuType";
import { AppAction } from "../state/appAction";
import React from "react";

export const useHandleToggleSidebarViewCallback = (
  dispatch: React.Dispatch<AppAction>,
  menuType: MenuType
) => {
  return React.useCallback(() => {
    dispatch({ type: "TOGGLE_MENU_IS_OPEN", menuType });
  }, [dispatch, menuType]);
};
