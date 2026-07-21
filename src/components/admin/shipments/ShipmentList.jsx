import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { Eye, Pencil, Trash2 } from "lucide-react";

import ViewShipmentModal from "./ViewShipmentModal";
import EditShipmentModal from "./EditShipmentModal";
import DeleteShipmentModal from "./DeleteShipmentModal";

function statusBadge(status) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "In Transit":
      return "bg-blue-100 text-blue-700";

    case "Processing":
      return "bg-yellow-100 text-yellow-700";

    case "Delayed":
      return "bg-red-100 text-red-700";

    case "Cancelled":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function modeBadge(mode) {
  switch (mode) {
    case "Air":
      return "bg-sky-100 text-sky-700";

    case "Ocean":
      return "bg-cyan-100 text-cyan-700";

    case "Inland":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ShipmentList({
    search,
}) {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [editingShipment, setEditingShipment] = useState(null);
  const [deletingShipment, setDeletingShipment] = useState(null);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get("/shipments");

      setShipments(data.shipments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading shipments...
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        No shipments found.
      </div>
    );
  }

  const filteredShipments = shipments.filter((shipment)=>{

    if(!search) return true;

    const q = search.toLowerCase();

    return (
        shipment.trackingNumber.toLowerCase().includes(q) ||
        shipment.senderName.toLowerCase().includes(q) ||
        shipment.receiverName.toLowerCase().includes(q) ||
        shipment.origin.toLowerCase().includes(q) ||
        shipment.destination.toLowerCase().includes(q)
    );

});

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Tracking No.</th>
              <th className="text-left p-4">Sender</th>
              <th className="text-left p-4">Receiver</th>
              <th className="text-left p-4">Route</th>
              <th className="text-left p-4">Current Location</th>
              <th className="text-left p-4">Delivery</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Mode</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredShipments.map((shipment) => (
              <tr
                key={shipment._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4 font-semibold">
                  {shipment.trackingNumber}
                </td>

                <td className="p-4">
                  {shipment.senderName}
                </td>

                <td className="p-4">
                  {shipment.receiverName}
                </td>

                <td className="p-4">
                  {shipment.origin} → {shipment.destination}
                </td>

                <td className="p-4">
                  {shipment.currentLocation || "-"}
                </td>

                <td className="p-4">
                  {formatDate(shipment.estimatedDelivery)}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      shipment.status
                    )}`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${modeBadge(
                      shipment.mode
                    )}`}
                  >
                    {shipment.mode}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">

                    {/* View */}

                    <button
                      onClick={() =>
                        setSelectedShipment(shipment)
                      }
                      className="p-2 rounded-lg hover:bg-slate-100"
                      title="View Shipment"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Edit */}

                    <button
                      onClick={() =>
                        setEditingShipment(shipment)
                      }
                      className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                      title="Edit Shipment"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() =>
                        setDeletingShipment(shipment)
                      }
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                      title="Delete Shipment"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* View */}

      {selectedShipment && (
        <ViewShipmentModal
          shipment={selectedShipment}
          onClose={() =>
            setSelectedShipment(null)
          }
        />
      )}

      {/* Edit */}

      {editingShipment && (
        <EditShipmentModal
          shipment={editingShipment}
          onClose={() =>
            setEditingShipment(null)
          }
          onUpdated={loadShipments}
        />
      )}

      {/* Delete */}

      {deletingShipment && (
        <DeleteShipmentModal
          shipment={deletingShipment}
          onClose={() =>
            setDeletingShipment(null)
          }
          onDeleted={loadShipments}
        />
      )}

    </>
  );
}