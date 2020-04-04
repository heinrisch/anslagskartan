import { HomeScenePresentation } from "./homeScenePresentation";
import React from "react";
import { AppContext } from "../../state/appContext";
import { ApiClient } from "../../utils/ApiClient";

export const HomeSceneContainer: React.FC = React.memo(() => {
  const { state } = React.useContext(AppContext);

  new ApiClient().ping().then((a) => console.log("ping", a));
  new ApiClient().authPing().then((a) => console.log("checkAuth", a));

  console.log(state);

  return (
    <HomeScenePresentation
      posts={state.posts}
      loadingPosts={state.loadingPosts}
    />
  );
});
