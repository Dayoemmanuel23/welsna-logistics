import { Search } from "lucide-react";
import QuoteList from "./QuoteList";

export default function Quotes() {
  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Quote Requests
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer quotation requests.
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <div className="flex items-center gap-3 border rounded-lg px-4 py-3">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search quotes..."
            className="w-full outline-none"
          />

        </div>

      </div>

      <QuoteList />

    </div>
  );
}