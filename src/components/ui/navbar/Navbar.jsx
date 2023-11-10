
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
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
