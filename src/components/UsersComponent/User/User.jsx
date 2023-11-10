import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>email: {user.email}</p>
      <p>status: {user.status}</p>
      <p>Role: {user.role}</p>
      <Link to={`/edit-user/${user.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
