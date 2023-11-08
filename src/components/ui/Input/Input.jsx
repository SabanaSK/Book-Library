import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

// Must add require later
Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Input;
