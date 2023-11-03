import { useState, useRef, useEffect } from "react";

import styles from "./RegisteruserPage.module.css";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import { validatePassword } from "../../components/validation/validation";
import api from "../../services/api";
const SelectPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "", // delete
  });
  const [inviteToken, setInviteToken] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) setInviteToken(token);
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
    let tempErrors = {
      password: validatePassword(formData.password),
      confirmPassword: "",
    };
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      tempErrors.confirmPassword = "Passwords do not match";
    }
    for (let key in tempErrors) {
      if (tempErrors[key]) {
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setFormData({
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.post("/registerWithInvite", {
          inviteToken,
          password: formData.password,
        });

        if (response.data.message === "Registration completed successfully.") {
          console.log("Registration successful");
          // history.push("/login"); // Redirect to login page
        } else {
          console.log("Error during registration");
        }
      } catch (error) {
        console.log("API call failed:", error);
      }

      resetForm();
    } else {
      console.log("form has errors");
    }
  };

  return (
    <div className={styles.SelectPasswordPage}>
      <h2>Select Password</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Choose a password"
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <Link to="/login" className={styles.loginButton}>
        Already have an account? Login Here
      </Link>
    </div>
  );
};

export default SelectPasswordPage;
