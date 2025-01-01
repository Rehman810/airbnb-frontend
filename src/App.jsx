import React, { lazy, Suspense } from "react";
import Loader from "./components/loader/loader";

const Router = lazy(() => import("./config/router/router"));
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Suspense fallback={<Loader open={true} />}>
      <Toaster />
      <Router />
    </Suspense>
  );
};
export default App
