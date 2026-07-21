import { Trash2 } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function DeleteQuoteModal({
  quote,
  onClose,
  onDeleted,
}) {
  const handleDelete = async () => {
    try {
      await apiClient.delete(`/quotes/${quote._id}`);

      onDeleted();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to delete quote.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="p-6">

          <div className="flex justify-center mb-5">

            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

              <Trash2
                size={30}
                className="text-red-600"
              />

            </div>

          </div>

          <h2 className="text-2xl font-bold text-center">
            Delete Quote
          </h2>

          <p className="text-center text-gray-500 mt-3">
            Are you sure you want to permanently delete this quote request?
          </p>

          <div className="bg-slate-100 rounded-lg p-4 mt-6 space-y-2">

            <p>
              <strong>Origin:</strong> {quote.origin}
            </p>

            <p>
              <strong>Destination:</strong> {quote.destination}
            </p>

            <p>
              <strong>Goods:</strong>{" "}
              {quote.custom_goods_type || quote.goods_type}
            </p>

            <p>
              <strong>Estimated Cost:</strong>{" "}
              ₦{Number(
                quote.estimated_cost || 0
              ).toLocaleString()}
            </p>

          </div>

        </div>

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete Quote
          </button>

        </div>

      </div>

    </div>
  );
}