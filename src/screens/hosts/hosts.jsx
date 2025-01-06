import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const NavbarHost = lazy(() => import("../../components/navbar/navbar2"));
const HostBookingsCalendar = lazy(() => import("../../pages/calendar/calendar"));
const Footer = lazy(() => import("../../components/footer/footer"));
const Today = lazy(() => import("../../pages/today/today"));
const Listings = lazy(() => import("../../pages/listings/listings"));

const Hosts = () => {
  return (
    <>
      <NavbarHost />
      <Routes>
        {/* Hosting Page */}
        <Route path="/today" element={<Today />} />

        {/* Listing Page */}
        <Route path="/listings" element={<Listings />} />

        {/* Host Bookings Calendar Page */}
        <Route path="/calendar" element={<HostBookingsCalendar />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Hosts;
