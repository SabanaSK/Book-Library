import BookList from "../../components/BooksComponent/BooksList/BooksList";
import LogoutButton from "../../components/UsersComponent/LogoutButton/LogoutButton";
import AdminUsersPage from "../AdminUsersPage/AdminUsersPage";

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>
      <p>Welcome to Book Library</p>
      <AdminUsersPage />
      <BookList />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
