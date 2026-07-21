import { useState } from "react";
import {
  Search,
  Ship,
  Plane,
  Truck,
  Package,
  FileCheck,
  PackageCheck,
  MapPin,
  Clock,
} from "lucide-react";
import apiClient from "@/api/apiClient";

const STAGES = [
  { key: "Processing", label: "Processing", icon: Package },
  { key: "Picked Up", label: "Picked Up", icon: FileCheck },
  { key: "In Transit", label: "In Transit", icon: Ship },
  { key: "Out for Delivery", label: "Out for Delivery", icon: PackageCheck },
  { key: "Delivered", label: "Delivered", icon: MapPin },
];

const STATUS_ORDER = [
  "Processing",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

function getModeIcon(mode) {
  if (mode === "Air") return Plane;
  if (mode === "Inland") return Truck;
  return Ship;
}

function formatDate(date) {
  if (!date) return "—";

  const d = new Date(date);

  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TrackingResult({ shipment }) {
  const currentIdx = Math.max(
  0,
  STATUS_ORDER.indexOf(shipment.status)
);

  const ModeIcon = getModeIcon(shipment.mode || "Ocean");

  return (
    <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Tracking ID
          </p>

          <p className="font-heading text-xl font-bold text-navy">
            {shipment.trackingNumber}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-accent/10">
          <ModeIcon className="w-4 h-4 text-primary-blue" />

          <span className="text-sm font-semibold text-primary-blue">
            {shipment.mode || "Ocean"} Freight
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-slate-100">
        <div>
          <p className="text-xs text-slate-500 mb-1">Origin</p>

          <p className="text-sm font-semibold text-navy">
            {shipment.origin}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-1">Destination</p>

          <p className="text-sm font-semibold text-navy">
            {shipment.destination}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-1">
            Current Location
          </p>

          <p className="text-sm font-semibold text-navy">
            {shipment.currentLocation || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-1">
            Estimated Delivery
          </p>

          <p className="text-sm font-semibold text-navy">
            {formatDate(shipment.estimatedDelivery)}
          </p>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-primary-blue" />

          <span className="text-sm font-semibold text-primary-blue">
            Shipment Progress
          </span>

          <span className="text-xs text-slate-500 ml-auto">
            Last Updated {formatDate(shipment.updatedAt)}
          </span>
        </div>

        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200" />

          <div
            className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-cyan-accent to-yellow-accent transition-all duration-500"
            style={{
              width: `calc((100% - 2.5rem) * ${
                currentIdx / (STAGES.length - 1)
              })`,
            }}
          />

          <div className="relative flex justify-between">
            {STAGES.map((stage, idx) => {
              const done = idx <= currentIdx;

              const current = idx === currentIdx;

              const Icon =
                stage.icon ||
                (stage.key === "In Transit"
                  ? ModeIcon
                  : Package);

              return (
                <div
                  key={stage.key}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      done
                        ? "bg-gradient-to-br from-cyan-accent to-primary-blue border-transparent text-white"
                        : "bg-white border-slate-200 text-slate-300"
                    } ${
                      current
                        ? "ring-4 ring-cyan-accent/30 scale-110"
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className={`text-[10px] sm:text-xs font-semibold text-center max-w-[80px] ${
                      done
                        ? "text-navy"
                        : "text-slate-400"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-navy text-white flex items-center gap-3">
          <PackageCheck className="w-5 h-5 text-cyan-accent" />

          <div>
            <p className="text-xs text-slate-300">
              Current Status
            </p>

            <p className="text-sm font-semibold">
              {shipment.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShipmentTracking() {
  const [trackingId, setTrackingId] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await apiClient.get(
  `/shipments/${trackingId.trim()}`
);

console.log("Shipment Response:", data);
console.log("Shipment Object:", data.shipment);

setResult(data.shipment);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("not_found");
      } else {
        setError("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="track" className="w-full">
      <form
        onSubmit={handleTrack}
        className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl"
      >
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-slate-400" />

          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking number (e.g. WEL-2026-000001)"
            className="w-full py-3 bg-transparent outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-navy text-white font-semibold"
        >
          {loading ? "Tracking..." : "Track Shipment"}
        </button>
      </form>

      {result && <TrackingResult shipment={result} />}

      {error === "not_found" && (
        <div className="mt-6 bg-white rounded-2xl border p-8 text-center">
          <h3 className="text-xl font-bold">
            Shipment Not Found
          </h3>

          <p className="mt-2">
            No shipment was found with tracking number{" "}
            <strong>{trackingId}</strong>.
          </p>
        </div>
      )}

      {error === "error" && (
        <div className="mt-6 bg-red-50 rounded-2xl border border-red-200 p-8 text-center">
          <h3 className="text-xl font-bold text-red-700">
            Server Error
          </h3>

          <p className="text-red-600">
            Unable to retrieve shipment information.
          </p>
        </div>
      )}
    </div>
  );
}