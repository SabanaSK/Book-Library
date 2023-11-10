import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userServices";
import User from "../User/User";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log("check response:", res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersTable;
