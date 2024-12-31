import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/home"));
const Rooms = lazy(() => import("../../components/rooms/rooms"));
const RequestToBook = lazy(() =>
  import("../../components/requestToBook/requestToBook")
);
const Navbar = lazy(() => import("../../components/navbar/navbar"));
const Footer = lazy(() => import("../../components/footer/footer"));

const Guests = () => {
  const stripePromise = loadStripe(
    "pk_test_51PZYVZ2LenqTzirVfDfTiKTmSeyFDpWtbPMrjDuV0f6H1p10GdpWNO0Si52AM8ocU7cXKoNimTemoEWo9fM7vqwW000W9cSPOb"
  );

  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Rooms Page */}
        <Route path="/rooms/:roomId" element={<Rooms />} />

        {/* Request to Book Page */}
        <Route
          path="/requestToBook/:roomId"
          element={
            <Elements stripe={stripePromise}>
              <RequestToBook />
            </Elements>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Guests;
