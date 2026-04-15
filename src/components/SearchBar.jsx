import { CATEGORIES } from "../constants/categories";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
  { value: "piece_price", label: "Piece Price" },
  { value: "case_price", label: "Case Price" },
];

const ctrlCls =
  "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

function SearchBar({
  value,
  onChange,
  categoryFilter,
  onCategoryChange,
  sortField,
  onSortFieldChange,
  sortAsc,
  onSortAscChange,
}) {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: "1px solid #e2d5bc" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 p-3 sm:p-4">

        {/* Name search */}
        <div className="relative flex-1 min-w-0">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm outline-none transition focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400"
          />
        </div>

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={`${ctrlCls} w-full sm:w-44`}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort field + direction */}
        <div className="flex gap-2 sm:shrink-0">
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
            className={`${ctrlCls} flex-1 sm:flex-none sm:w-44`}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onSortAscChange(!sortAsc)}
            title={sortAsc ? "Ascending — click for descending" : "Descending — click for ascending"}
            className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-500 transition hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700"
          >
            {sortAsc ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default SearchBar;
