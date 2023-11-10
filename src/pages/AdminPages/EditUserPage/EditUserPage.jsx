import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/ui/Loading/Loading";
import {
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../../../services/userServices";

const EditUserPage = () => {
  const { userId } = useParams();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  });

  const initializePage = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      navigate("/");
      return;
    }
    await validateToken(token);
    setIsLoading(false);
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUpdateRole = async () => {
    const response = await updateUser(userId, { role });
    if (response.data.message === "Role updated successfully") {
      console.log("Update role success", response.data);
    } else {
      console.log("fail");
    }
  };
  const handleDeleteUser = async () => {
    const response = await deleteUser(userId);
    if (response.data.message === "User deleted successfully.") {
      console.log("Delete User success", response.data);
    } else {
      console.log("fail", response.data);
    }
  };
  return (
    <div>
      <h2>Edit User Role</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Current Role: {user.role}</p>
        </div>
      )}
      <label htmlFor="role">Select Role:</label>
      <select id="role" onChange={handleRoleChange} value={role}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleUpdateRole}>Update Role</button>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default EditUserPage;
