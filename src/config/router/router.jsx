import React, { lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const Guests = lazy(() =>
  import("../../screens/guests/guests")
);
const Hosts = lazy(() =>
  import("../../screens/hosts/hosts")
);
const Protected = lazy(() =>
  import("../../components/protected/protected")
);
const ListingSteps = lazy(() =>
  import(
    "../../components/listingSteps/listingSteps"
  )
);
const CommonRoutes = lazy(() =>
  import("../../screens/common/common")
);

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Common Pages */}
          <Route
            path="/user/*"
            element={<CommonRoutes />}
          />

          {/* Host Pages */}
          <Route
            path="/hosting/*"
            element={
              <Protected
                Component={Hosts}
                allowedRoles={["host"]}
              />
            }
          />

          {/* Listing Steps Pages */}
          <Route
            path="/listingSteps"
            element={
              <Protected
                Component={ListingSteps}
                allowedRoles={["host"]}
              />
            }
          />

          {/* Guests Pages */}
          <Route path="/*" element={<Guests />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
