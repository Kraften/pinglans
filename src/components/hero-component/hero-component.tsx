import React from "react";
import styles from "./hero-component.module.scss";

const HeroComponent: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.imageGrid}></div>
      <div className={styles.heroCard}>
        <h1>Petter</h1>
        <h1>Kraft</h1>
      </div>
    </div>
  );
};

export default HeroComponent;
