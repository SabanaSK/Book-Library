import { logoutUser } from "../../services/bookService";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; 
    }catch (error) {
      console.error("Error during logout:", error.response ? error.response.data.message : error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
