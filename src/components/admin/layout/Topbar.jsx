export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">
            Administrator
          </p>

          <p className="text-sm text-gray-500">
            admin@welsna.com
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}