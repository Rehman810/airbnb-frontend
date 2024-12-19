import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// const GetStarted = lazy(() => import("../../components/host/getStarted"));
const NavbarHost = lazy(() => import("../../components/navbar/navbar2"));
const Footer = lazy(() => import("../../components/footer/footer"));
const Today = lazy(() => import("../../pages/today/today"));
const Listings = lazy(() => import("../../pages/listings/listings"));

import useDocumentTitle from '../../hooks/dynamicTitle/dynamicTitle';

const Hosts = () => {
    useDocumentTitle("Host Dashboard - Airbnb");
  return (
    <>
      <NavbarHost />
        <Routes>
          {/* Hosting Page */}
          <Route path="/today" element={<Today />} />

          {/* Listing Page */}
          <Route path="/listings" element={<Listings />} />
        </Routes>
        <Footer />
    </>
  );
};

export default Hosts;
