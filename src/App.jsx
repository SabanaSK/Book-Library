import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import BookPage from "./pages/BookPage/BookPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import { UserContextProvider } from "./context/UserContext";
import AdminBooksPage from "./pages/AdminBooksPage/AdminBooksPage";
import CreateBookPage from "./pages/CreateBookPage/CretaeBookPage";
import EditBookPage from "./pages/EditBookPage/EditBookPage";

function AuthenticatedRoutes() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/adminBook" element={<AdminBooksPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/edit-book/:bookId" element={<EditBookPage />} />
      </Routes>
    </UserContextProvider>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

function App() {
  const location = useLocation();

  const isPublicRoute =
    location.pathname === "/" || location.pathname.startsWith("/public");

  return (
    <div>{isPublicRoute ? <PublicRoutes /> : <AuthenticatedRoutes />}</div>
  );
}

export default App;
