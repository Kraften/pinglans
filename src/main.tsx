import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.scss";
import HeaderMenu from "./components/header-menu/header-menu";
import HeroComponent from "./components/hero-component/hero-component";
import Events from "./components/events-component/events";
import ReleaseList from "./components/release-list/releaseList";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderMenu></HeaderMenu>
    <HeroComponent></HeroComponent>
    <Events></Events>
    <ReleaseList></ReleaseList>
  </React.StrictMode>
);
