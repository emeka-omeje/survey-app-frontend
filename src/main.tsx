import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { InstantRoutes } from "./RouteComponents/InstantRoutes";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <InstantRoutes />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
