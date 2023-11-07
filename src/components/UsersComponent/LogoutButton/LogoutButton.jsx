import { logoutUser } from "../../../services/userServices";

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

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
