import { useState } from "react";
import { X } from "lucide-react";
import apiClient from "@/api/apiClient";

export default function AddShipmentModal({
  onClose,
  onCreated,
}) {
  const [saving, setSaving] = useState(false);

  const [form,setForm]=useState({

senderName:"",
senderEmail:"",

receiverName:"",
receiverEmail:"",

origin:"",
destination:"",
description:"",
status:"Processing",
mode:"Ocean",
currentLocation:"",
estimatedDelivery:""

});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await apiClient.post("/shipments", form);

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to create shipment.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <div>
            <h2 className="text-2xl font-bold">
              Add Shipment
            </h2>

            <p className="text-gray-500 text-sm">
              Create a new shipment
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-lg p-2"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid md:grid-cols-2 gap-5">

            {/* Sender */}

            <div>
              <label className="font-medium">
                Sender Name
              </label>

              <input
                name="senderName"
                value={form.senderName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Sender Email
              </label>

              <input
                type="email"
                name="senderEmail"
                value={form.senderEmail}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Receiver */}

            <div>
              <label className="font-medium">
                Receiver Name
              </label>

              <input
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
    <label className="font-medium">
        Sender Email
    </label>

    <input
        type="email"
        name="senderEmail"
        value={form.senderEmail}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mt-2"
    />
</div>

<div>
    <label className="font-medium">
        Receiver Email
    </label>

    <input
        type="email"
        name="receiverEmail"
        value={form.receiverEmail}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mt-2"
    />
</div>

            <div>
              <label className="font-medium">
                Receiver Email
              </label>

              <input
                type="email"
                name="receiverEmail"
                value={form.receiverEmail}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Route */}

            <div>
              <label className="font-medium">
                Origin
              </label>

              <input
                name="origin"
                value={form.origin}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Destination
              </label>

              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Tracking */}

            <div>
              <label className="font-medium">
                Current Location
              </label>

              <input
                name="currentLocation"
                value={form.currentLocation}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-medium">
                Estimated Delivery
              </label>

              <input
                type="date"
                name="estimatedDelivery"
                value={form.estimatedDelivery}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Status */}

            <div>
              <label className="font-medium">
                Shipment Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>Processing</option>
                <option>Picked Up</option>
                <option>In Transit</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Delayed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div>
              <label className="font-medium">
                Freight Mode
              </label>

              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>Ocean</option>
                <option>Air</option>
                <option>Inland</option>
              </select>
            </div>

          </div>

          {/* Description */}

          <div className="mt-6">

            <label className="font-medium">
              Shipment Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
          >
            {saving ? "Saving..." : "Create Shipment"}
          </button>

        </div>

      </div>

    </div>
  );
}