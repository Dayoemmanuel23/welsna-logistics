import { Search } from "lucide-react";
import { useState } from "react";
import ContactList from "./ContactList";

export default function Contacts() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer enquiries and messages.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <ContactList search={search} />
    </div>
  );
}