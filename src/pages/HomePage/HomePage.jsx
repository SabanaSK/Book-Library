import BookList from "../../components/BooksComponent/BooksList/BooksList";
import LogoutButton from "../../components/UsersComponent/LogoutButton/LogoutButton";
import Navbar from "../../components/ui/navbar/navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleAdminPageClick = () => {
    navigate("/adminBook");
  };
  return (
    <div>
      <Navbar />
      <p>Home Page</p>
      <p>Welcome to Book Library</p>
      <button onClick={handleAdminPageClick}>Admin Books</button>
      <BookList />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
