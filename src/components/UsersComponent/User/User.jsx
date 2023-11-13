import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./User.module.css";

const User = ({ user }) => {
  return (
    <div className={styles["user-container"]}>
      <p className={styles["user-description"]}>Username:</p>
      <p className={styles["user-detail"]}>{user.username}</p>
      <p className={styles["user-description"]}>Email:</p>
      <p className={styles["user-detail"]}>{user.email}</p>
      <p className={styles["user-description"]}>CreatedAt:</p>
      <p className={styles["user-detail"]}>{user.createdAt}</p>
      <p className={styles["user-description"]}>UpdatedBy:</p>
      <p className={styles["user-detail"]}>{user.updatedBy}</p>
      <p className={styles["user-description"]}>UpdatedAt:</p>
      <p className={styles["user-detail"]}>{user.updatedAt}</p>
      <p className={styles["user-description"]}>Status:</p>
      <p className={styles["user-detail"]}>{user.status}</p>
      <p className={styles["user-description"]}>Role:</p>
      <p className={styles["user-detail"]}>{user.role}</p>
      <Link to={`/edit-user/${user.id}`} className={styles["edit-link"]}>
        <button className={styles["edit-button"]}>Edit</button>
      </Link>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedBy: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
