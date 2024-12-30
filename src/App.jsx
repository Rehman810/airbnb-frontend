import React, { lazy, Suspense } from "react";
import Loader from "./components/loader/loader";

const Router = lazy(() => import("./config/router/router"));

const App = () => {
  return (
    <Suspense fallback={<Loader open={true} />}>
      <Router />
    </Suspense>
  );
}

export default App
