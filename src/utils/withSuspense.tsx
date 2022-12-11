import { Suspense, ReactNode } from "react";

const withSuspense = (component: ReactNode) => (
  <Suspense fallback="Route Loading...">{component}</Suspense>
);

export default withSuspense;
