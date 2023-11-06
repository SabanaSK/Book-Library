import { useState, useEffect, useRef } from "react";
import Input from "../../components/ui/Input";
import { validatePassword } from "../../components/validation/validation";
import { resetPassword } from "../../services/userServices";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = queryParams.get("token");
    if (token) setResetToken(token);
  }, []);
  const formRef = useRef(null);
  const resetForm = () => {
    setNewPassword("");
    setConfirmPassword("");
    setErrors({ password: "", confirmPassword: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //recheck the error message
    if (!resetToken) {
      setMessage("Invalid reset token. Please check your link and try again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Both password fields are required.");
      return;
    }
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError =
      newPassword !== confirmPassword ? "Passwords do not match." : "";

    if (newPasswordError || confirmPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }
    try {
      const response = await resetPassword(
        resetToken,
        newPassword,
        confirmPassword
      );
      console.log(response.message);
      if (response.success) {
        setMessage("Your password has been reset successfully.");
        resetForm();
      } else {
        console.log("my message", response.message);
        setMessage(
          response.message || "An error occurred while resetting your password."
        );
      }
    } catch (error) {
      setMessage("An error occurred while resetting your password.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="password"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
        {errors.password && <p>{errors.password}</p>}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
