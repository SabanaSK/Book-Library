import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../services/userServices";

const EditUserRole = () => {
  const { userId } = useParams();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null); 

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserById(userId); 
        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }

    fetchUser();
  }, [userId]);

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

export default EditUserRole;
