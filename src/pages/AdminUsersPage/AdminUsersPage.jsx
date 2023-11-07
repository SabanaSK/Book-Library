import { useState } from "react";
import InviteUser from "../../components/UsersComponent/InviteUser/InviteUser";

const AdminUsersPage = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleInviteClick = () => {
    setShowInviteModal(true);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
  };

  return (
    <div>
      <button type="button" onClick={handleInviteClick}>
        Invite User
      </button>
      {showInviteModal && <InviteUser onClose={handleCloseModal} />}
    </div>
  );
};

export default AdminUsersPage;
