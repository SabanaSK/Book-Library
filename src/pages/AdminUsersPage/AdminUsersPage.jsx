import { useState } from "react";
import InviteUser from "../../components/UsersComponent/InviteUser/InviteUser";
import UsersTable from "../../components/UsersComponent/UsersTable/UsersTable";

const AdminUsersPage = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleInviteClick = () => {
    setShowInviteModal(prev => !prev);
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
  };

  return (
    <div>
      <h1>Users Management</h1>
      <button type="button" onClick={handleInviteClick}>
        Invite User
      </button>
      {showInviteModal && <InviteUser onClose={handleCloseModal} />}

      <UsersTable/>
    </div>
  );
};

export default AdminUsersPage;
