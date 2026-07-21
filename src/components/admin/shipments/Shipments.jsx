import { useState } from "react";
import { Plus, Search } from "lucide-react";

import ShipmentList from "./ShipmentList";
import AddShipmentModal from "./AddShipmentModal";

export default function Shipments() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");

  const refreshShipments = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shipments</h1>
          <p className="text-gray-500">
            Manage all shipment records
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-cyan-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          Add Shipment
        </button>
      </div>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <div className="flex items-center border rounded-lg px-4 py-3 gap-3">
          <Search size={18} />

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by Tracking Number, Sender, Receiver..."
            className="w-full outline-none"
          />
        </div>
      </div>

      <ShipmentList
        key={refreshKey}
        search={search}
      />

      {showAddModal && (
        <AddShipmentModal
          onClose={()=>setShowAddModal(false)}
          onCreated={refreshShipments}
        />
      )}
    </div>
  );
}