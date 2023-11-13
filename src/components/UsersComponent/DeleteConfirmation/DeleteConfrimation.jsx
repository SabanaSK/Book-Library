import PropTypes from "prop-types";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles["modal-background"]}>
      <div className={styles["modal-container"]}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this user?</p>
        <button
          onClick={onConfirm}
          className={`${styles.button} ${styles["delete-button"]}`}
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className={`${styles.button} ${styles["cancel-button"]}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
