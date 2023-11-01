import BookList from "../../components/BooksList/BooksList";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const HomePage = () => {
  return (
    <div>
      <p>Welcome to Book Library</p>
      <BookList />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
