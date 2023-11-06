import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import { validatePassword } from "../../components/validation/validation";
import { Register } from "../../services/userServices";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inviteToken, setInviteToken] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = queryParams.get("token");
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
        const response = await Register(inviteToken, formData.password);

        if (response.data.message === "Registration completed successfully.") {
          console.log("Registration successful");
          navigate("/");
        } else {
          console.log("Error during registration:", response.data.message);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
      resetForm();
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Choose a password"
          value={formData.password}
        />
        {errors.password && <p>{errors.password}</p>}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
