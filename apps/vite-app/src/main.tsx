import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@repo/ui/globals.css";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
