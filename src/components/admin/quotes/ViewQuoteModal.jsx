import { X } from "lucide-react";

export default function ViewQuoteModal({
  quote,
  onClose,
}) {
  if (!quote) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Quote Details
            </h2>

            <p className="text-gray-500">
              Customer quotation request
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>
            <p className="text-gray-500 text-sm">Origin</p>
            <p className="font-semibold">{quote.origin}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Destination</p>
            <p className="font-semibold">{quote.destination}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Goods Type</p>
            <p className="font-semibold">
              {quote.custom_goods_type || quote.goods_type}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Weight</p>
            <p className="font-semibold">
              {quote.weight} kg
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Estimated Cost</p>
            <p className="font-semibold">
              ₦{Number(
                quote.estimated_cost || 0
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p className="font-semibold">
              {quote.status}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">
              Date Submitted
            </p>

            <p className="font-semibold">
              {new Date(
                quote.createdAt
              ).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end">

          <button
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}