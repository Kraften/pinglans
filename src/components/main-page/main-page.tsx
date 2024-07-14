import React from "react";
import Footer from "../footer-component/footer";
import HeaderMenu from "../header-menu/header-menu";
import HeroComponent from "../hero-component/hero-component";
import ReleaseList from "../release-list/releaseList";
import Sax from "../svg/sax-logo-svg/sax";
import styles from "./main-page.module.scss";

const MainPage: React.FC = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <HeroComponent></HeroComponent>
      {/* <Events></Events> */}
      {/* <ReleaseList></ReleaseList> */}
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
