import { X } from "lucide-react";

export default function ViewUserModal({
  user,
  onClose,
}) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          <div>
            <label className="font-semibold text-gray-500">
              Full Name
            </label>

            <p className="mt-1 text-lg">
              {user.name}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Email
            </label>

            <p className="mt-1">
              {user.email}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Role
            </label>

            <p className="mt-1 capitalize">
              {user.role}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Created
            </label>

            <p className="mt-1">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}