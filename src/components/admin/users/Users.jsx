import { useState } from "react";
import { Plus, Search } from "lucide-react";

import UserList from "./UserList";
import AddUserModal from "./AddUserModal";

export default function Users() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] =
    useState(false);

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage administrators and staff accounts.
          </p>

        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-lg"
        >
          <Plus size={18} />

          Add User

        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <div className="flex items-center gap-3 border rounded-lg px-4 py-3">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </div>

      <UserList search={search} />

      {showAddModal && (
  <AddUserModal
    onClose={() => setShowAddModal(false)}
    onCreated={() => {
      setShowAddModal(false);
      window.location.reload();
    }}
  />
)}

    </div>
  );
}