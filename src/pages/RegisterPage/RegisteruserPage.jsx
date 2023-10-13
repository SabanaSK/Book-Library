import { useState, useRef } from "react";
import styles from "./RegisteruserPage.module.css";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";

const RegisteruserPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const formRef = useRef(null);

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

    for (let key in formData) {
      if (!formData[key].trim()) {
        isValid = false;
        tempErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return isValid;
  };
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Registration form is valid");
      //  Handle successful registration logic here, like sending data to the backend
      resetForm();
    } else {
      console.log("Registration form has errors");
    }
  };
  return (
    <div className={styles.registerUserPage}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <Input
          label="Username"
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="Choose a username"
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

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

export default RegisteruserPage;
