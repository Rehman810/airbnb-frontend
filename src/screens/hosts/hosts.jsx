import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Protected from "../../components/protected/protected";

// const GetStarted = lazy(() => import("../../components/host/getStarted"));
const NavbarHost = lazy(() => import("../../components/navbar/navbar2"));
const Footer = lazy(() => import("../../components/footer/footer"));
const Today = lazy(() => import("../../pages/today/today"));
const Listings = lazy(() => import("../../pages/listings/listings"));
const ProfileSection = lazy(() => import("../../components/profile/profile"));

const Hosts = () => {
  return (
    <>
      <NavbarHost />
      <Routes>
        {/* Hosting Page */}
        <Route path="/today" element={<Today />} />

        {/* Listing Page */}
        <Route path="/listings" element={<Listings />} />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={<Protected Component={ProfileSection} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Hosts;
