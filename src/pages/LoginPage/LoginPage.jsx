import { useState, useRef } from "react";
import styles from "./LoginPage.module.css";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    genericError: "", //Contains error messages that are more general and not tied to a specific input field.  (for our knowladge )
  });

  const formRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // TODO: Once the backend is ready, connect with the database for proper authentication.

  const checkAuthentication = (username, password) => {
    const correctUsername = "admin";
    const correctPassword = "password123";

    return username === correctUsername && password === correctPassword;
  };
  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      isValid = false;
      tempErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      isValid = false;
      tempErrors.password = "Password is required";
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
        )}{" "}
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
