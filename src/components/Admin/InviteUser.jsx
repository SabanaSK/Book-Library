import { useState } from "react";
import { inviteUserByEmail } from "../../services/userServices";
import {
  validateEmail,
  validationUsername,
} from "../../components/validation/validation";
const InviteUser = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const sendInvitation = async () => {
    try {
      const response = await inviteUserByEmail(username, email);
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error inviting user:", err);
      setSuccess(false);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };
  return (
    <div>
      <h2>Invite User</h2>
      <input
        type="username"
        placeholder="Enter user's username"
        value={validationUsername.username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter user's email"
        value={validateEmail.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendInvitation}>Invite</button>
      {success && <p>User invited successfully!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
export default InviteUser;
