import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import BookPage from "./pages/BookPage/BookPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import { UserContextProvider } from "./context/UserContext";
import AdminBooksPage from "./pages/AdminBooksPage/AdminBooksPage";
import CreateBookPage from "./pages/CreateBookPage/CreateBookPage";
import EditBookPage from "./pages/EditBookPage/EditBookPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import AdminUsersPage from "./pages/AdminUsersPage/AdminUsersPage";

function AuthenticatedRoutes() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/adminBooks" element={<AdminBooksPage />} />
        <Route path="/adminUsers" element={<AdminUsersPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/edit-book/:bookId" element={<EditBookPage />} />
        <Route path="/edit-user/:userId" element={<EditUserPage />} />
      </Routes>
    </UserContextProvider>
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

  const token = searchParams.get("token");

  const isTokenRoute =
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/reset-password");

  const isPublicRoute =
    location.pathname === "/" || location.pathname.startsWith("/forgot");

  let routeComponents = null;

  if (isTokenRoute && token) {
    routeComponents = <TokenRoutes />;
  } else if (isPublicRoute) {
    routeComponents = <PublicRoutes />;
  } else {
    routeComponents = <AuthenticatedRoutes />;
  }

  return <div>{routeComponents}</div>;
}

export default App;
