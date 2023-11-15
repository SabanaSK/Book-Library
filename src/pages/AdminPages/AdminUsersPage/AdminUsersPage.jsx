import { useState, useEffect } from "react";
import InviteUser from "../../../components/UsersComponent/InviteUser/InviteUser";
import UsersTable from "../../../components/UsersComponent/UsersTable/UsersTable";
import Loading from "../../../components/ui/Loading/Loading";
import { getCurrentUser, autoLogin } from "../../../services/userServices";
import { useNavigate } from "react-router";
import Navbar from "../../../components/ui/navbar/navbar";
import styles from "./AdminUsersPage.module.css";

const AdminUsersPage = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      await tryAutologin();
    }
    await validateToken(token);
    setIsLoading(false);
  };

  const tryAutologin = async () => {
    try {
      const response = await autoLogin();
      setIsLoading(false);
      setIsAuthenticated(true);
      const newToken = response.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      return;
    } catch (autoLoginError) {
      setIsLoading(false);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      navigate("/");
      return Promise.reject(autoLoginError);
    }
  };
  const validateToken = async (token) => {
    try {
      const response = await getCurrentUser(token);
      if (response.data.user.role == "admin") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleInviteClick = () => {
    setShowInviteModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
  };
  const getButtonClassName = () => {
    return showInviteModal ? styles["invite-active"] : styles["invite-button"];
  };

  return (
    <div>
      <Navbar />
      <div className={styles["container"]}>
        <h1 className={styles["header"]}>Users Management</h1>
        <div className={styles["invite-section"]}>
          <button
            type="button"
            onClick={handleInviteClick}
            className={getButtonClassName()}
          >
            Invite User
          </button>
          {showInviteModal && <InviteUser onClose={handleCloseModal} />}
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default AdminUsersPage;
