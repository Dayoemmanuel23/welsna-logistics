import { X } from "lucide-react";

export default function ViewContactModal({
  contact,
  onClose,
}) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-xl font-bold">
            Contact Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-gray-500">
                Name
              </label>

              <p className="font-semibold mt-1">
                {contact.name}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>

              <p className="font-semibold mt-1">
                {contact.email}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Phone
              </label>

              <p className="font-semibold mt-1">
                {contact.phone || "-"}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Subject
              </label>

              <p className="font-semibold mt-1">
                {contact.subject}
              </p>
            </div>

          </div>

          <div>

            <label className="text-sm text-gray-500">
              Message
            </label>

            <div className="mt-2 p-4 rounded-lg bg-slate-50 border whitespace-pre-wrap">
              {contact.message}
            </div>

          </div>

          <div>

            <label className="text-sm text-gray-500">
              Date Received
            </label>

            <p className="font-semibold mt-1">
              {new Date(contact.createdAt).toLocaleString()}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}