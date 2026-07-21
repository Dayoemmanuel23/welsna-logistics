import { useState } from "react";
import { X } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function EditQuoteModal({
  quote,
  onClose,
  onUpdated,
}) {
  const [status, setStatus] = useState(quote.status);
  const [estimated_cost, setEstimatedCost] = useState(
    quote.estimated_cost || 0
  );

  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    try {
      setLoading(true);

      await apiClient.put(`/quotes/${quote._id}`, {
        status,
        estimated_cost,
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to update quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            Edit Quote
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            >
              <option>New</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Estimated Cost
            </label>

            <input
              type="number"
              value={estimated_cost}
              onChange={(e) =>
                setEstimatedCost(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={saveChanges}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}