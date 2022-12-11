import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "stores/auth";
import { NON_AUTH_ROUTES } from "./constants";

const RouteGuard: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { pathname } = useLocation();

  const [_, basePath] = pathname.split("/");

  const navigate = useNavigate();

  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (!currentUser) {
      useAuthStore.persist.clearStorage();
      navigate("/login", { replace: true });
      return;
    }
    if (NON_AUTH_ROUTES.includes(basePath)) {
      navigate("/", { replace: true });
    }
  }, [currentUser, pathname]);

  return <>{children}</>;
};

export default RouteGuard;
