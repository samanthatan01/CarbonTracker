import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => {
                navData.isActive ? styles.active : "";
              }}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => {
                navData.isActive ? styles.active : "";
              }}
              to="/member/list"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
