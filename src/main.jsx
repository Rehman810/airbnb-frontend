import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { AppProvider } from "./context/context.jsx";
import { WishlistProvider } from "./context/wishlistProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </AppProvider>
  </StrictMode>
);
