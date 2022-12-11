import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import withSuspense from "utils/withSuspense";

const Dashboard = lazy(() => import("./Dashboard"));

const dashboardRouter: RouteObject = {
  path: "/",
  element: withSuspense(<Dashboard />),
};

export default dashboardRouter;
