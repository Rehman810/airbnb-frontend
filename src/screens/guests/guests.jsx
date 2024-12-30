import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/home"));
const Rooms = lazy(() => import("../../components/rooms/rooms"));
const RequestToBook = lazy(() => import("../../components/requestToBook/requestToBook"));
const Navbar = lazy(() => import("../../components/navbar/navbar"));
const Footer = lazy(() => import("../../components/footer/footer"));

const Guests = () => {
  return (
    <>
      <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

           {/* Rooms Page */}
           <Route path="/rooms/:roomId" element={<Rooms />} />

           {/* Request to Book Page */}
           <Route path="/requestToBook/:roomId" element={<RequestToBook />} />
        </Routes>
        <Footer />
    </>
  );
};

export default Guests;
