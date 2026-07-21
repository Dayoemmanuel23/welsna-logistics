import { useState } from "react";
import apiClient from "@/api/apiClient";
import { X } from "lucide-react";

export default function EditContactModal({
  contact,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    subject: contact?.subject || "",
    message: contact?.message || "",
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
        `/contacts/${contact._id}`,
        form
      );

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update contact.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h2 className="text-2xl font-bold">
            Edit Contact
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >

          {/* Scrollable Content */}

          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            <div>

              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
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
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                value={form.subject}
                onChange={(e) =>
                  handleChange("subject", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Message
              </label>

              <textarea
                rows={8}
                value={form.message}
                onChange={(e) =>
                  handleChange("message", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-cyan-500 outline-none"
              />

            </div>

          </div>

          {/* Footer */}

          <div className="border-t bg-white px-6 py-4 flex justify-end gap-3">

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
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}