import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { Eye, Pencil, Trash2 } from "lucide-react";

import ViewQuoteModal from "./ViewQuoteModal";
import EditQuoteModal from "./EditQuoteModal";
import DeleteQuoteModal from "./DeleteQuoteModal";

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedQuote, setSelectedQuote] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get("/quotes");

      setQuotes(data.quotes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading quotes...
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        No quote requests found.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="text-left p-4">Origin</th>
              <th className="text-left p-4">Destination</th>
              <th className="text-left p-4">Goods</th>
              <th className="text-left p-4">Weight</th>
              <th className="text-left p-4">Estimated Cost</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
              <th className="text-center p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {quotes.map((quote) => (

              <tr
                key={quote._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  {quote.origin}
                </td>

                <td className="p-4">
                  {quote.destination}
                </td>

                <td className="p-4">
                  {quote.custom_goods_type || quote.goods_type}
                </td>

                <td className="p-4">
                  {quote.weight} kg
                </td>

                <td className="p-4 font-semibold">
                  ₦{Number(
                    quote.estimated_cost || 0
                  ).toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      quote.status
                    )}`}
                  >
                    {quote.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    quote.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    {/* View */}

                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowViewModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Edit */}

                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowEditModal(true);
                      }}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
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

      {showViewModal && (
        <ViewQuoteModal
          quote={selectedQuote}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && (
        <EditQuoteModal
          quote={selectedQuote}
          onClose={() => setShowEditModal(false)}
          onUpdated={loadQuotes}
        />
      )}

      {showDeleteModal && (
        <DeleteQuoteModal
          quote={selectedQuote}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={loadQuotes}
        />
      )}
    </>
  );
}