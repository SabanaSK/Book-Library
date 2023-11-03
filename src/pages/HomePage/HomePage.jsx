import BookList from "../../components/BooksList/BooksList";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import AdminPage from "../AdminPage/AdminPage";

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>
      <p>Welcome to Book Library</p>
      <AdminPage />
      <BookList />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
