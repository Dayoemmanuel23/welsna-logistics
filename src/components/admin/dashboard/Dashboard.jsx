import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";

import ShipmentChart from "./ShipmentChart";
import QuoteChart from "./QuoteChart";
import StatusChart from "./StatusChart";

const initialDashboard = {
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
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
  try {
    const { data } = await apiClient.get("/dashboard");

    const dashboardData = data.dashboard || {};

    setDashboard({
      stats: {
        ...initialDashboard.stats,
        ...(data.stats || {}),
      },

      shipmentStatus: dashboardData.shipmentStatus || [],

      monthlyShipments:
        dashboardData.monthlyShipments || [],

      monthlyQuotes:
        dashboardData.monthlyQuotes || [],

      recentShipments:
        dashboardData.recentShipments || [],

      recentQuotes:
        dashboardData.recentQuotes || [],

      recentContacts:
        dashboardData.recentContacts || [],
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    setDashboard(initialDashboard);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-semibold animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const { stats } = dashboard;

  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Welcome to the Welsna Logistics Admin Dashboard
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-6">

        <StatCard title="Shipments" value={stats.totalShipments} />

        <StatCard
          title="Active"
          value={stats.activeShipments}
          color="text-blue-600"
        />

        <StatCard
          title="Delivered"
          value={stats.deliveredShipments}
          color="text-green-600"
        />

        <StatCard
          title="Quotes"
          value={stats.totalQuotes}
          color="text-orange-600"
        />

        <StatCard
          title="Contacts"
          value={stats.totalContacts}
          color="text-cyan-600"
        />

        <StatCard
          title="Users"
          value={stats.totalUsers}
          color="text-purple-600"
        />

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

      {/* Shipment Status */}

      <div className="grid lg:grid-cols-3 gap-8">

        <StatusChart
          data={dashboard.shipmentStatus}
        />

        <Card title="Recent Shipments">

          {dashboard.recentShipments.length === 0 ? (
            <Empty text="No shipments available." />
          ) : (
            dashboard.recentShipments.map((shipment) => (
              <div
                key={shipment._id}
                className="flex justify-between border-b pb-3"
              >
                <div>

                  <p className="font-semibold">
                    {shipment.trackingNumber ||
                      shipment.tracking_number}
                  </p>

                  <p className="text-sm text-gray-500">
                    {shipment.origin} → {shipment.destination}
                  </p>

                </div>

                <span className="text-cyan-600 text-sm font-medium">
                  {shipment.status}
                </span>

              </div>
            ))
          )}

        </Card>

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-8">

        <Card title="Recent Quotes">

          {dashboard.recentQuotes.length === 0 ? (
            <Empty text="No quote requests." />
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
                  ₦
                  {Number(
                    quote.estimated_cost ?? quote.estimatedCost ?? 0
                  ).toLocaleString()}
                </p>

              </div>
            ))
          )}

        </Card>

        <Card title="Recent Contacts">

          {dashboard.recentContacts.length === 0 ? (
            <Empty text="No contact messages." />
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
                  {contact.subject || "No Subject"}
                </p>

              </div>
            ))
          )}

        </Card>

      </div>

    </div>
  );
}

function StatCard({ title, value, color = "" }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Empty({ text }) {
  return (
    <p className="text-gray-500">
      {text}
    </p>
  );
}