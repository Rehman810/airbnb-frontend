import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { AppProvider } from "./context/context.jsx";
import { WishlistProvider } from "./context/wishlistProvider.jsx";
import { BookingProvider } from "./context/booking.jsx";
import "./i18n/i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <WishlistProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </WishlistProvider>
    </AppProvider>
  </StrictMode>
);
