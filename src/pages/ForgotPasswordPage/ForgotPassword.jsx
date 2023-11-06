import { useState } from "react";
import Input from "../../components/ui/Input";
import { validateEmail } from "../../components/validation/validation";
import { forgotPassword } from "../../services/userServices";

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

    if (email) {
      try {
        const response = await forgotPassword(email);
        if (response.status === 200) {
          setMessage("Invitation sent successfully.");
          setEmail("");
        } else {
          setError("Failed to send invitation.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {error && <p>{error}</p>}
        <button type="submit">Send Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
