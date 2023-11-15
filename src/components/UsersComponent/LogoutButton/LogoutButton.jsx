import { logoutUser } from "../../../services/userServices";
import styles from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      navigate("/");
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
