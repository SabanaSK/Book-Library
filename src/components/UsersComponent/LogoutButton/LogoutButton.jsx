import { logoutUser } from "../../../services/userServices";
import styles from "./Logout.module.css";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <button onClick={handleLogout} className={styles["logout-button"]}>
      Logout
    </button>
  );
};

export default LogoutButton;
