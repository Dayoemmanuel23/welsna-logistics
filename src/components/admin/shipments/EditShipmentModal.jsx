import { useState } from "react";
import { X } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function EditShipmentModal({
  shipment,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    status: shipment.status || "Processing",
    mode: shipment.mode || "Ocean",
    currentLocation: shipment.currentLocation || "",
    estimatedDelivery: shipment.estimatedDelivery
      ? shipment.estimatedDelivery.substring(0, 10)
      : "",
    description: shipment.description || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await apiClient.put(
        `/shipments/${shipment._id}`,
        form
      );

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to update shipment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-2xl font-bold">
              Edit Shipment
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {shipment.trackingNumber}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Shipment Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Processing">
                Processing
              </option>

              <option value="Picked Up">
                Picked Up
              </option>

              <option value="In Transit">
                In Transit
              </option>

              <option value="Out for Delivery">
                Out for Delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Delayed">
                Delayed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Freight Mode
            </label>

            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Ocean">
                Ocean Freight
              </option>

              <option value="Air">
                Air Freight
              </option>

              <option value="Inland">
                Inland Transport
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Current Location
            </label>

            <input
              type="text"
              name="currentLocation"
              value={form.currentLocation}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Current shipment location"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Estimated Delivery
            </label>

            <input
              type="date"
              name="estimatedDelivery"
              value={form.estimatedDelivery}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Shipment Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 resize-none"
              placeholder="Shipment description..."
            />
          </div>

        </div>

        {/* Footer */}

        <div className="border-t bg-white px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border hover:bg-gray-100 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}