import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import withSuspense from "utils/withSuspense";

const Login = lazy(() => import("./Login"));

const nonAuthRouter: RouteObject = {
  path: "login",
  element: withSuspense(<Login />),
};

export default nonAuthRouter;
