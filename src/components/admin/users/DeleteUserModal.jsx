import { useState } from "react";
import apiClient from "@/api/apiClient";

export default function DeleteUserModal({
  user,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleDelete = async () => {

    setLoading(true);

    try {

      await apiClient.delete(`/users/${user._id}`);

      onDeleted();
      onClose();

    } catch (error) {

      console.error(error);
      alert("Unable to delete user.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-bold text-red-600">
            Delete User
          </h2>

        </div>

        <div className="p-6">

          <p className="mb-4">
            Are you sure you want to permanently delete this user?
          </p>

          <div className="bg-slate-100 rounded-lg p-4 space-y-2">

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

          </div>

        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}