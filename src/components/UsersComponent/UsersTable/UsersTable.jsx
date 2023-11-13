import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userServices";
import User from "../User/User";
import styles from "./UsersTable.module.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);
  return (
    <div className={styles["users-container"]}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersTable;
