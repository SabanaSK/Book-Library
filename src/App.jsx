import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import BookPage from "./pages/AdminPages/BookPage/BookPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import AdminBooksPage from "./pages/AdminPages/AdminBooksPage/AdminBooksPage";
import CreateBookPage from "./pages/AdminPages/CreateBookPage/CreateBookPage";
import EditBookPage from "./pages/AdminPages/EditBookPage/EditBookPage";
import EditUserPage from "./pages/AdminPages/EditUserPage/EditUserPage";
import AdminUsersPage from "./pages/AdminPages/AdminUsersPage/AdminUsersPage";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/book/:bookId" element={<BookPage />} />
      <Route path="/adminBooks" element={<AdminBooksPage />} />
      <Route path="/adminUsers" element={<AdminUsersPage />} />
      <Route path="/create-book" element={<CreateBookPage />} />
      <Route path="/edit-book/:bookId" element={<EditBookPage />} />
      <Route path="/edit-user/:userId" element={<EditUserPage />} />
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

function TokenRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

function App() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (checkPublicRoutes(location)) {
    return (
      <div>
        <PublicRoutes />
      </div>
    );
  }

  if (checkTokenRoutes(location, searchParams)) {
    return (
      <div>
        <TokenRoutes />
      </div>
    );
  }

  return (
    <div>
      <AuthenticatedRoutes />
    </div>
  );
}

function checkPublicRoutes(location) {
  const isPublicRoute =
    location.pathname === "/" || location.pathname.startsWith("/forgot");

  if (isPublicRoute) {
    return true;
  }
  return false;
}

function checkTokenRoutes(location, searchParams) {
  const token = searchParams.get("token");
  const isTokenRoute =
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/reset-password");

  if (isTokenRoute && token) {
    return true;
  }
  return false;
}

export default App;
