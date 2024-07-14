import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.scss";
import MainPage from "./components/main-page/main-page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainPage></MainPage>
  </React.StrictMode>
);
