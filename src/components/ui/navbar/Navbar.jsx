import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  return (
    <div>
      <p>{username}</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/adminBooks">Books</Link>
        </li>
        <li>
          <Link to="/adminUsers">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
