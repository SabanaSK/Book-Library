import { useState } from "react";
import Input from "../../components/ui/Input/Input";
import { validateEmail } from "../../components/validation/validation";
import { forgotPassword } from "../../services/userServices";
import styles from "./ForgotPasswordPage.module.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    } else {
      setError("");
    }

    try {
      const response = await forgotPassword(email);
      if (response.status === 200) {
        setMessage(
          "If your email address is registered with us, you will receive a password reset link shortly."
        );
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
      <Link className={styles["goback-button"]} to={`/`}>
        <p> ← Go Back</p>
      </Link>
      <div className={styles["forgot-page"]}>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <h2 className={styles["heading"]}>Forgot Password</h2>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {error && <p className={styles["error"]}>{error}</p>}
          {message && <p className={styles["success"]}>{message}</p>}
          <button className={styles["submit-button"]} type="submit">
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
