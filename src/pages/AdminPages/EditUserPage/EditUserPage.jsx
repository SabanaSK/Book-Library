import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../../../components/ui/Loading/Loading";
import {
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
  autoLogin,
} from "../../../services/userServices";
import styles from "./EditUserPage.module.css";
import DeleteConfirmationModal from "../../../components/UsersComponent/DeleteConfirmation/DeleteConfrimation";

const EditUserPage = () => {
  const { userId } = useParams();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUser();
  }, [userId]);

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
    navigate("/home");
    return null;
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    const response = await updateUser(userId, { role });
    if (response.data.message === "Role updated successfully") {
      navigate("/adminUsers");
    } else {
      console.log("fail");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("id:", userId);
      const response = await deleteUser(userId);
      if (response.data.message === "User deleted successfully.") {
        navigate("/adminUsers");
      } else {
        console.log("Fail", response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <Link className={styles["goback-button"]} to={`/adminUsers`}>
        <p> ← Go Back</p>
      </Link>
      <div className={styles["edit-user-container"]}>
        <h2 className={styles["edit-user-header"]}>Edit User Role</h2>
        {user && (
          <div className={styles["user-details"]}>
            <p className={styles["user-detail"]}>Username: {user.username}</p>
            <p className={styles["user-detail"]}>Email: {user.email}</p>
            <p className={styles["user-detail"]}>CreatedAt: {user.createdAt}</p>
            <p className={styles["user-detail"]}>UpdatedBy: {user.updatedBy}</p>
            <p className={styles["user-detail"]}>UpdatedAt: {user.updatedAt}</p>
            <p className={styles["user-detail"]}>Current Role: {user.role}</p>
          </div>
        )}
        <label htmlFor="role" className={styles.label}>
          Select Role:
        </label>
        <select
          id="role"
          onChange={handleRoleChange}
          value={role}
          className={styles["select-role"]}
        >
          <option value="" disabled>
            Choose Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleUpdateRole}
          className={`${styles.button} ${styles["update-button"]}`}
        >
          Update Role
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className={`${styles.button} ${styles["delete-button"]}`}
        >
          Delete User
        </button>
        {showDeleteConfirm && (
          <DeleteConfirmationModal
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EditUserPage;
