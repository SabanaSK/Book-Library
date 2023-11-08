import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";

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
    </div>
  );
};

export default Navbar;
