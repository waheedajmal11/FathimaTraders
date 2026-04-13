function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          id="search"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search items by name..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3.5 text-sm shadow-md outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>
    </div>
  );
}

export default SearchBar;
