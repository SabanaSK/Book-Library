import { useState } from "react";
import styles from "./ForgotPassword.module.css";
import Input from "../../components/ui/Input";
import { validateEmail } from "../../components/validation/validation";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    } else {
      setError("");
    }

    // TODO: Temporarily mocking backend interaction, Once backend is set then need to write logic accordingly
    if (email) {
      setMessage("A reset link has been sent to your email (mock response)."); // once banckend is ready take out mock
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Send Link</button>
      </form>
      {message && <p>{message}</p>}
      {message && (
        <button onClick={() => navigate("/reset-password")}>
          Go to Reset Page (Mock button)
          {/* No need when backend is done */}
        </button>
      )}
    </div>
  );
};

export default ForgotPassword;
