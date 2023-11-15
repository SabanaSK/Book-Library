import PropTypes from "prop-types";
import { useState } from "react";
import { deleteBooks } from "../../../services/bookServices";
import styles from "./DeleteBook.module.css";

const DeleteBook = ({ bookId, bookTitle, onDeleteSuccess }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBooks(bookId);
      onDeleteSuccess(bookId);
      setIsConfirmingDelete(false);
    } catch (error) {
      console.error("Failed to delete the book:", error);
      setIsConfirmingDelete(false);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div>
      <button onClick={handleDeleteClick} className={styles["delete-button"]}>
        Delete
      </button>
      {isConfirmingDelete && (
        <div>
          <p className={styles["confirm-message"]}>
            Are you sure you want to delete {bookTitle}?
          </p>
          <button onClick={confirmDelete} className={styles["delete-button"]}>
            Confirm Delete
          </button>
          <button onClick={cancelDelete} className={styles["cancel-button"]}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

DeleteBook.propTypes = {
  bookId: PropTypes.string.isRequired,
  bookTitle: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteBook;
