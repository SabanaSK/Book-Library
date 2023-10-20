import { useState, useRef } from "react";
import styles from "./LoginPage.module.css";
import Input from "../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import {
  validationUsername,
  validatePassword,
} from "../../components/validation/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    genericError: "",
  });

  const formRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAuthentication = (username, password) => {
    const correctUsername = "admin";
    const correctPassword = "password123";
    return username === correctUsername && password === correctPassword;
  };

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      username: validationUsername(formData.username),
      password: validatePassword(formData.password),
    };

    if (tempErrors.username || tempErrors.password) {
      isValid = false;
    }

    if (isValid && !checkAuthentication(formData.username, formData.password)) {
      isValid = false;
      tempErrors.genericError = "Username or password is wrong";
    }

    setErrors(tempErrors);
    return isValid;
  };
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setFormData({
        username: "",
        password: "",
      });
      setErrors({
        username: "",
        password: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid");
      resetForm();
      navigate("/");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="Username"
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="Enter your username"
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        {errors.genericError && (
          <p className={styles.error}>{errors.genericError}</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
      <Link to="/register" className={styles.registerButton}>
        Register Here
      </Link>
    </div>
  );
};
export default LoginPage;
