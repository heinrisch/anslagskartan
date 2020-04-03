import React from "react";
import { LogoutButton } from "../buttons/logoutButton";

type LoginInfoProps = {
  displayName: string;
};

export const LoginInfo: React.FC<LoginInfoProps> = React.memo((props) => {
  const { displayName } = props;

  return (
    <>
      Inloggad som: {displayName}
      <LogoutButton />
    </>
  );
});
