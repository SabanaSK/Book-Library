import { useState } from "react";
import { inviteUserByEmail } from "../../../services/userServices";
import styles from "./InviteUser.module.css";

const InviteUserPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInvite = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await inviteUserByEmail(username, email);
      if (response.status === 200) {
        setSuccess("Invitation sent successfully.");
        setUsername("");
        setEmail("");
      } else {
        setError("Failed to send invitation.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className={styles["invite-form-container"]}>
      <h2 className={styles["invite-form-title"]}>Invite User</h2>
      <form onSubmit={handleInvite} className={styles["invite-form"]}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles["invite-input"]}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles["invite-input"]}
        />
        <button type="submit" className={styles["invite-button"]}>
          Send Invite
        </button>
      </form>
      {error && (
        <p
          className={`${styles["feedback-message"]} ${styles["error-message"]}`}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          className={`${styles["feedback-message"]} ${styles["success-message"]}`}
        >
          {success}
        </p>
      )}
    </div>
  );
};

export default InviteUserPage;
