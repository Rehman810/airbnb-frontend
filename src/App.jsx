import React, { lazy, Suspense } from "react";
import Loader from "./components/loader/loader";

const Router = lazy(() => import("./config/router/router"));
import { Toaster } from "react-hot-toast";
import { ToastNotification } from "./components/toast/toast";

const App = () => {
  return (
    <Suspense fallback={<Loader open={true} />}>
      <ToastNotification />
      <Toaster />
      <Router />
    </Suspense>
  )
};
export default App
