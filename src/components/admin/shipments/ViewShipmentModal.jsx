import { X } from "lucide-react";

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ViewShipmentModal({
  shipment,
  onClose,
}) {
  if (!shipment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-2xl font-bold">
              Shipment Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Tracking Number: {shipment.trackingNumber}
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

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Sender
              </label>

              <p className="mt-1 text-lg">
                {shipment.senderName}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Receiver
              </label>

              <p className="mt-1 text-lg">
                {shipment.receiverName}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Origin
              </label>

              <p className="mt-1">
                {shipment.origin}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Destination
              </label>

              <p className="mt-1">
                {shipment.destination}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Current Location
              </label>

              <p className="mt-1">
                {shipment.currentLocation || "-"}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Shipment Status
              </label>

              <p className="mt-1">
                {shipment.status}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Freight Mode
              </label>

              <p className="mt-1">
                {shipment.mode}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Estimated Delivery
              </label>

              <p className="mt-1">
                {formatDate(shipment.estimatedDelivery)}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Created
              </label>

              <p className="mt-1">
                {formatDate(shipment.createdAt)}
              </p>

            </div>

            <div>

              <label className="text-sm font-semibold text-gray-500">
                Last Updated
              </label>

              <p className="mt-1">
                {formatDate(shipment.updatedAt)}
              </p>

            </div>

          </div>

          <div className="mt-8">

            <label className="text-sm font-semibold text-gray-500">
              Shipment Description
            </label>

            <div className="mt-2 bg-slate-50 border rounded-xl p-5 whitespace-pre-wrap">
              {shipment.description || "No description provided."}
            </div>

            <div className="mt-8">

<h3 className="text-xl font-bold mb-4">
Shipment Timeline
</h3>

<div className="space-y-5">

{shipment.trackingHistory?.map((history,index)=>(

<div
key={index}
className="border-l-4 border-cyan-600 pl-5"
>

<p className="font-semibold">
{history.status}
</p>

<p className="text-gray-500">
{history.location}
</p>

<p className="text-sm text-gray-400">
{history.remark}
</p>

<p className="text-xs text-gray-400 mt-1">
{new Date(history.updatedAt).toLocaleString()}
</p>

</div>

))}

</div>

</div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}