import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Guests = lazy(() => import("../../screens/guests/guests"));
const Hosts = lazy(() => import("../../screens/hosts/hosts"));
const Protected = lazy(() => import("../../components/protected/protected"));

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Guests Page */}
          <Route path="/*" element={<Guests />} />

          {/* Host Pages */}
          <Route path="/hosting/*" element={<Protected Component={Hosts} allowedRoles={['host']} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
