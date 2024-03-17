import React from "react";
import styles from "./header-menu.module.scss";

const HeaderMenu: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <h1>Petter Kraft</h1>
        <ul className={styles.menuList}>
          <li>
            <h3>Home</h3>
          </li>
          <li>
            <h3>Work</h3>
          </li>
          <li>
            <h3>Videos</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
