import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/ui/Input/Input";
import { validatePassword } from "../../components/validation/validation";
import { resetPassword } from "../../services/userServices";
import { validateResetToken } from "../../services/tokenService";
import Loading from "../../components/ui/Loading/Loading";
import styles from "./ResetPassword.module.css";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidResetToken, setValidResetToken] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = queryParams.get("token");
    if (token) setResetToken(token);
  }, []);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = async () => {
    setIsLoading(true);
    const token = extractTokenFromURL();
    if (!token) {
      setIsLoading(false);
      navigate("/");
      return;
    }
    await validateToken(token);
    setIsLoading(false);
  };

  const extractTokenFromURL = () => {
    const queryParams = new URLSearchParams(window.location.hash.split("?")[1]);
    return queryParams.get("token");
  };

  const validateToken = async (token) => {
    try {
      await validateResetToken(token);
      setResetToken(token);
      setValidResetToken(true);
    } catch (error) {
      console.error("Failed to validate reset token:", error);
      setValidResetToken(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isValidResetToken) {
    navigate("/");
    return null;
  }

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
    <div className={styles["reset-page"]}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles["form"]}>
        <h2 className={styles["heading"]}>Reset Password</h2>
        <Input
          className={styles["input-field"]}
          label="New Password"
          type="password"
          name="newPassword"
          onChange={handleInputChange}
          placeholder="Enter your new password"
          value={formData.newPassword}
        />
        {errors.newPassword && (
          <p className={styles["error"]}>{errors.newPassword}</p>
        )}
        <Input
          className={styles["input-field"]}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className={styles["error"]}>{errors.confirmPassword}</p>
        )}
        <button type="submit" className={styles["submit-button"]}>
          Reset Password
        </button>
        <Link className={styles["login-button"]} to={`/`}>
          <p>Go to Login?</p>
        </Link>
      </form>
      {message && <p className={styles["error"]}>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
