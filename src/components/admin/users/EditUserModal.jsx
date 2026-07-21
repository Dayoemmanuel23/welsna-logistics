import { useState } from "react";
import { X } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function EditUserModal({
  user,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "admin",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {

      await apiClient.put(
        `/users/${user._id}`,
        form
      );

      onUpdated();
      onClose();

    } catch (error) {

      console.error(error);
      alert("Unable to update user.");

    } finally {

      setSaving(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-2xl font-bold">
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >

          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Role
              </label>

              <select
                value={form.role}
                onChange={(e) =>
                  handleChange("role", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>

            </div>

          </div>

          <div className="border-t px-6 py-4 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}