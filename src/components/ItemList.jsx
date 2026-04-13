const CATEGORY_COLORS = {
  Cigarettes:    { bg: "#fee2e2", color: "#991b1b" },
  "Pan Parag":   { bg: "#ffedd5", color: "#9a3412" },
  Chocolates:    { bg: "#fef3c7", color: "#78350f" },
  Chips:         { bg: "#fefce8", color: "#713f12" },
  Biscuits:      { bg: "#dcfce7", color: "#14532d" },
  Beverages:     { bg: "#dbeafe", color: "#1e3a8a" },
  Confectionery: { bg: "#ede9fe", color: "#4c1d95" },
  Dairy:         { bg: "#cffafe", color: "#164e63" },
  Household:     { bg: "#e2e8f0", color: "#1e293b" },
  Other:         { bg: "#f1f5f9", color: "#475569" },
};

function ItemList({ items, loading, onEdit, onDelete }) {
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-md p-8 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading items...
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl bg-white shadow-md p-12 text-center">
        <svg className="mx-auto mb-3 w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
        </svg>
        <p className="text-sm font-medium text-slate-500">No items found.</p>
        <p className="text-xs text-slate-400 mt-1">Add your first product price using the form above.</p>
      </div>
    );
  }

  const isRecentlyUpdated = (dateString) => {
    if (!dateString) {
      return false;
    }
    const updatedTime = new Date(dateString).getTime();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    return now - updatedTime <= oneDay;
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)", border: "1px solid #c8922a" }}>

      {/* Section header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 opacity-70 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-sm font-bold text-white uppercase tracking-widest">Product Price List</span>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(240,192,64,0.18)", color: "#f0c040", border: "1px solid rgba(240,192,64,0.35)" }}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* ── MOBILE: card list (hidden on md+) ── */}
      <div className="md:hidden divide-y divide-slate-100 bg-white">
        {items.map((item) => {
          const catStyle = CATEGORY_COLORS[item.category] || { bg: "#f1f5f9", color: "#475569" };
          const fresh = isRecentlyUpdated(item.updated_at);
          return (
            <div
              key={item.id}
              className="px-4 py-3"
              style={{ background: fresh ? "#fffaed" : "#ffffff" }}
            >
              {/* Row 1: name + category */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {fresh && <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: "#c8922a" }} />}
                  <span className="font-bold text-slate-800 text-sm leading-snug">{item.name}</span>
                </div>
                {item.category && (
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0" style={{ background: catStyle.bg, color: catStyle.color }}>
                    {item.category}
                  </span>
                )}
              </div>
              {/* Row 2: prices */}
              <div className="flex items-center gap-4 mb-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Piece</div>
                  <div className="text-base font-bold" style={{ color: "#111111" }}>{currencyFormatter.format(item.piece_price)}</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Case</div>
                  <div className="text-base font-bold" style={{ color: "#b87d20" }}>{currencyFormatter.format(item.case_price)}</div>
                </div>
              </div>
              {/* Row 3: actions + date */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ""}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg px-4 py-2 text-xs font-semibold"
                    style={{ background: "#faf6ed", color: "#111111", border: "1px solid #c8922a" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="rounded-lg px-4 py-2 text-xs font-semibold"
                    style={{ background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: table (hidden on mobile) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ background: "#111111" }}>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Item Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Piece Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Case Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Last Updated</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="transition-colors"
                style={{
                  background: isRecentlyUpdated(item.updated_at)
                    ? "#fffaed"
                    : index % 2 === 0 ? "#ffffff" : "#faf8f5",
                }}
              >
                <td className="border-t border-slate-100 px-4 py-3">
                  <div className="flex items-center gap-2">
                    {isRecentlyUpdated(item.updated_at) && (
                      <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: "#c8922a" }} />
                    )}
                    <span className="font-semibold text-slate-800">{item.name}</span>
                  </div>
                </td>
                <td className="border-t border-slate-100 px-4 py-3">
                  {item.category ? (
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: (CATEGORY_COLORS[item.category] || { bg: "#f1f5f9" }).bg,
                        color: (CATEGORY_COLORS[item.category] || { color: "#475569" }).color,
                      }}
                    >
                      {item.category}
                    </span>
                  ) : <span className="text-slate-400 text-xs">—</span>}
                </td>
                <td className="border-t border-slate-100 px-4 py-3">
                  <span className="font-semibold" style={{ color: "#111111" }}>{currencyFormatter.format(item.piece_price)}</span>
                </td>
                <td className="border-t border-slate-100 px-4 py-3">
                  <span className="font-bold" style={{ color: "#b87d20" }}>{currencyFormatter.format(item.case_price)}</span>
                </td>
                <td className="border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
                  {item.updated_at ? new Date(item.updated_at).toLocaleString() : "—"}
                </td>
                <td className="border-t border-slate-100 px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                      style={{ background: "#faf6ed", color: "#111111", border: "1px solid #c8922a" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                      style={{ background: "#fff1f2", color: "#be123c", border: "1px solid #fecdd3" }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemList;
