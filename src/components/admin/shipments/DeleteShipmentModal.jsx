import { Trash2, X } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function DeleteShipmentModal({
  shipment,
  onClose,
  onDeleted,
}) {
  const handleDelete = async () => {
    try {
      await apiClient.delete(
        `/shipments/${shipment._id}`
      );

      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to delete shipment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-xl font-bold text-red-600">
            Delete Shipment
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-lg p-2"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <Trash2
              size={38}
              className="text-red-600"
            />
          </div>

          <p className="text-center text-lg font-semibold">
            Are you sure?
          </p>

          <p className="text-center text-gray-500 mt-3">
            You are about to permanently delete
            this shipment.
          </p>

          <div className="mt-6 p-4 rounded-lg bg-slate-100">

            <p>
              <strong>Tracking:</strong>{" "}
              {shipment.trackingNumber}
            </p>

            <p>
              <strong>Receiver:</strong>{" "}
              {shipment.receiverName}
            </p>

          </div>

        </div>

        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          >
            Delete Shipment
          </button>

        </div>

      </div>

    </div>
  );
}