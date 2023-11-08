import BookList from "../../components/BooksComponent/BooksList/BooksList";
import LogoutButton from "../../components/UsersComponent/LogoutButton/LogoutButton";
import Navbar from "../../components/ui/navbar/navbar";
import AdminUsersPage from "../AdminUsersPage/AdminUsersPage";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <p>Home Page</p>
      <p>Welcome to Book Library</p>
      <AdminUsersPage />
      <BookList />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
