import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import BookPage from "./pages/BookPage/BookPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Registeruser from "./pages/RegisterPage/RegisteruserPage";

function App() {
  return (
    <div>
      <div>
        {" "}
        {/* Will be remove later */}
        <Link to="/">Home</Link>
        <Link to="/login">Login Page</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/register" element={<Registeruser />} />
      </Routes>
    </div>
  );
}

export default App;
