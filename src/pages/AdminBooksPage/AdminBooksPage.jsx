import { useNavigate } from "react-router";

const AdminBooksPage = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/create-book");
  };
  return (
    <div>
      <p>BOOKS</p>
      <button type="button" onClick={handleCreateClick}>
        Create Book
      </button>
      <button type="button">Edit Book</button>
      <button type="button">Delete Book</button>
      <form></form>
    </div>
  );
};
export default AdminBooksPage;
