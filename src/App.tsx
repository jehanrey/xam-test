import { FC } from "react";
import { Outlet } from "react-router-dom";

import RouteGuard from "modules/Auth/RouteGuard";

const App: FC = () => {
  return (
    <RouteGuard>
      <Outlet />
    </RouteGuard>
  );
};

export default App;
