import React from "react";
import "@fontsource-variable/manrope";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./business-plan.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
