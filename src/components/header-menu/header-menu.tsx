import React from "react";
import styles from "./header-menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

const HeaderMenu: React.FC = () => {
  return (
    <nav>
      <h1>Petter</h1>
      <ul className={styles.linkList}>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faYoutube} size="3x" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/petterkraft/?hl=en">
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
