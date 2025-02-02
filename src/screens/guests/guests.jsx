import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() =>
  import("../../pages/home/home")
);
const Rooms = lazy(() =>
  import("../../components/rooms/rooms")
);
const Navbar = lazy(() =>
  import("../../components/navbar/navbar")
);
const Footer = lazy(() =>
  import("../../components/footer/footer")
);

const NotFoundPage = lazy(() =>
  import("../../components/notFound/notFound")
);

const Guests = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Rooms Page */}
        <Route
          path="/rooms/:roomId"
          element={<Rooms />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Guests;
