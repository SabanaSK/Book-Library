import { useState, useEffect, useRef } from "react";
import Input from "../../components/ui/Input/Input";
import { validatePassword } from "../../components/validation/validation";
import { resetPassword } from "../../services/userServices";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = queryParams.get("token");
    if (token) setResetToken(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {};

    tempErrors.newPassword = validatePassword(formData.newPassword);

    tempErrors.confirmPassword =
      formData.newPassword !== formData.confirmPassword
        ? "Passwords do not match."
        : "";

    setErrors(tempErrors);

    isValid = !Object.values(tempErrors).some((error) => error);

    return isValid;
  };

  const resetForm = () => {
    setFormData({ newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      setMessage("Invalid reset token. Please check your link and try again.");
      return;
    }

    if (validateForm()) {
      try {
        const response = await resetPassword(
          resetToken,
          formData.newPassword,
          formData.confirmPassword
        );

        if (response) {
          setMessage("Your password has been reset successfully.");
          resetForm();
        } else {
          setMessage(
            response.message ||
              "An error occurred while resetting your password."
          );
        }
      } catch (error) {
        setMessage("An error occurred while resetting your password.");
      }
    } else {
      setMessage("Please correct the errors before submitting.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          onChange={handleInputChange}
          placeholder="Enter your new password"
          value={formData.newPassword}
        />
        {errors.newPassword && <p>{errors.newPassword}</p>}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
