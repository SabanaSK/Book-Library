import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import LogoutButton from "../../UsersComponent/LogoutButton/LogoutButton";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/userServices";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      getCurrentUser(token)
        .then((response) => {
          if (response.status === 200 && response.data.user) {
            console.log(response.data.user);
            setCurrentUser(response.data.user.username);
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [token]);

  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <p className={styles["nav-text"]}>{currentUser}</p>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles["nav-link-active"] : styles["nav-link"]
            }
          >
            <span className={styles["link-text"]}>Home</span>
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink
            to="/adminBooks"
            className={({ isActive }) =>
              isActive ? styles["nav-link-active"] : styles["nav-link"]
            }
          >
            <span className={styles["link-text"]}>Books</span>
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink
            to="/adminUsers"
            className={({ isActive }) =>
              isActive ? styles["nav-link-active"] : styles["nav-link"]
            }
          >
            <span className={styles["link-text"]}>Users</span>
          </NavLink>
        </li>
      </ul>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
