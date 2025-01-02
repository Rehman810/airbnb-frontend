import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Protected = lazy(() =>
  import("../../components/protected/protected")
);
const ProfileSection = lazy(() =>
  import("../../components/profile/profile")
);
const Wishlist = lazy(() =>
  import("../../pages/wishlist/wishlist")
);
const RequestToBook = lazy(() =>
  import(
    "../../components/requestToBook/requestToBook"
  )
);
const Navbar = lazy(() =>
  import("../../components/navbar/navbar2")
);
const Footer = lazy(() =>
  import("../../components/footer/footer")
);

const CommonRoutes = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Request to Book Page */}
        <Route
          path="/requestToBook/:roomId"
          element={
            <Protected
              Component={
                ()=>(<Elements stripe={stripePromise}>
                  <RequestToBook />
                </Elements>)
              }
            />
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <Protected
              Component={ProfileSection}
            />
          }
        />
        
        {/* Wishlist Page */}
        <Route
          path="/wishlist"
          element={
            <Protected
              Component={Wishlist}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default CommonRoutes;
