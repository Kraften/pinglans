import React, { useEffect } from "react";
import styles from "./hero-component.module.scss";
import { gsap } from "gsap";
import Sax from "../svg/sax-logo-svg/sax";

const HeroComponent: React.FC = () => {
  return (
    <div className={`hero ${styles.hero}`}>
      <Sax></Sax>
      {/* <div className={styles.images}>
        <img
          id="image1"
          className={styles.image1}
          src="/pingla2.jpg"
          alt=""
        ></img>
        <img
          id="image2"
          className={styles.image2}
          src="/pingla3.jpg"
          alt=""
        ></img>
        <img
          id="image3"
          className={styles.image3}
          src="/pingla4.jpg"
          alt=""
        ></img>
        <img
          id="image4"
          className={styles.image4}
          src="/pingla6.jpg"
          alt=""
        ></img>
      </div> */}
    </div>
  );
};

export default HeroComponent;
