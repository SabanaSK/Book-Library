import { useState } from "react";
import { inviteUserByEmail } from "../../../services/userServices";

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
        // Optionally reset the form
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
    <div>
      <h2>Invite User</h2>
      <form onSubmit={handleInvite}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Invite</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default InviteUserPage;
