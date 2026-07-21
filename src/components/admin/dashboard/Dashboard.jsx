import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";

import ShipmentChart from "./ShipmentChart";
import QuoteChart from "./QuoteChart";
import StatusChart from "./StatusChart";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    stats: {
      totalShipments: 0,
      activeShipments: 0,
      deliveredShipments: 0,
      totalQuotes: 0,
      totalContacts: 0,
      totalUsers: 0,
    },
    shipmentStatus: [],
    monthlyShipments: [],
    monthlyQuotes: [],
    recentShipments: [],
    recentQuotes: [],
    recentContacts: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const { data } = await apiClient.get("/dashboard/stats");

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const { stats } = dashboard;

  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to the Welsna Logistics Admin Dashboard
        </p>
      </div>

      {/* Statistics */}

      <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Shipments
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalShipments}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {stats.activeShipments}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Delivered
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {stats.deliveredShipments}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Quotes
          </p>

          <h2 className="text-4xl font-bold mt-2 text-orange-600">
            {stats.totalQuotes}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Contacts
          </p>

          <h2 className="text-4xl font-bold mt-2 text-cyan-600">
            {stats.totalContacts}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Users
          </p>

          <h2 className="text-4xl font-bold mt-2 text-purple-600">
            {stats.totalUsers}
          </h2>
        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        <ShipmentChart
          data={dashboard.monthlyShipments}
        />

        <QuoteChart
          data={dashboard.monthlyQuotes}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <StatusChart
          data={dashboard.shipmentStatus}
        />

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Shipments
          </h2>

          <div className="space-y-4">

            {dashboard.recentShipments.length === 0 ? (
              <p className="text-gray-500">
                No shipments available.
              </p>
            ) : (
              dashboard.recentShipments.map((shipment) => (
                <div
                  key={shipment._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>

                    <p className="font-semibold">
                      {shipment.tracking_number}
                    </p>

                    <p className="text-sm text-gray-500">
                      {shipment.origin} → {shipment.destination}
                    </p>

                  </div>

                  <span className="text-sm font-medium text-cyan-600">
                    {shipment.status}
                  </span>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Quotes
          </h2>

          <div className="space-y-3">

            {dashboard.recentQuotes.length === 0 ? (
              <p className="text-gray-500">
                No quote requests.
              </p>
            ) : (
              dashboard.recentQuotes.map((quote) => (
                <div
                  key={quote._id}
                  className="border-b pb-3"
                >
                  <p className="font-semibold">
                    {quote.origin} → {quote.destination}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₦{Number(
                      quote.estimated_cost || 0
                    ).toLocaleString()}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Contacts
          </h2>

          <div className="space-y-3">

            {dashboard.recentContacts.length === 0 ? (
              <p className="text-gray-500">
                No contact messages.
              </p>
            ) : (
              dashboard.recentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="border-b pb-3"
                >
                  <p className="font-semibold">
                    {contact.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {contact.subject}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}