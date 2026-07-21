import { useState } from "react";
import apiClient from "@/api/apiClient";

export default function DeleteContactModal({
  contact,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  if (!contact) return null;

  const handleDelete = async () => {
    setLoading(true);

    try {
      await apiClient.delete(`/contacts/${contact._id}`);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to delete contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold text-red-600">
            Delete Contact
          </h2>
        </div>

        <div className="p-6">

          <p className="text-gray-700">
            Are you sure you want to permanently delete this
            contact message?
          </p>

          <div className="mt-5 bg-slate-100 rounded-lg p-4">

            <p>
              <strong>Name:</strong> {contact.name}
            </p>

            <p>
              <strong>Email:</strong> {contact.email}
            </p>

            <p>
              <strong>Subject:</strong>{" "}
              {contact.subject || "-"}
            </p>

          </div>

        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
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