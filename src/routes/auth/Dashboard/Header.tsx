import { FC } from "react";

import Button from "components/Button";
import useAuthStore from "stores/auth";

const Header: FC = () => {
  const { currentUser, logout } = useAuthStore();

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-medium">{currentUser}</h1>
      <Button primary className="text-lg font-bold" onClick={logout}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Header;
