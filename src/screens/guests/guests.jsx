import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/home"));
const Navbar = lazy(() => import("../../components/navbar/navbar"));
const Footer = lazy(() => import("../../components/footer/footer"));

const Guests = () => {
  return (
    <>
      <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
    </>
  );
};

export default Guests;
