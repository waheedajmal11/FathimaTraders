import { useEffect, useMemo, useRef, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";
import supabase from "./lib/supabase";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const initialLoadRef = useRef(true);
  const latestRequestIdRef = useRef(0);

  const messageClass = useMemo(() => {
    if (message.type === "success") {
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    }
    if (message.type === "error") {
      return "border border-rose-200 bg-rose-50 text-rose-700";
    }
    return "";
  }, [message.type]);

  const fetchItems = async (searchValue = "") => {
    const requestId = ++latestRequestIdRef.current;
    setLoading(true);

    let query = supabase
      .from("items")
      .select("*")
      .order("name", { ascending: true });

    if (searchValue.trim()) {
      query = query.ilike("name", `%${searchValue.trim()}%`);
    }

    const { data, error } = await query;

    if (requestId !== latestRequestIdRef.current) {
      return;
    }

    if (error) {
      setMessage({ type: "error", text: "Failed to load items." });
      setLoading(false);
      return;
    }

    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      fetchItems(searchTerm);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchItems(searchTerm);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSubmit = async (payload) => {
    setSaving(true);

    if (editingItem) {
      const { error } = await supabase
        .from("items")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", editingItem.id);

      if (error) {
        setMessage({ type: "error", text: "Failed to update item." });
        setSaving(false);
        return false;
      }

      setEditingItem(null);
      setMessage({ type: "success", text: "Item updated successfully." });
    } else {
      const { error } = await supabase.from("items").insert(payload);

      if (error) {
        setMessage({ type: "error", text: "Failed to add item." });
        setSaving(false);
        return false;
      }

      setMessage({ type: "success", text: "Item added successfully." });
    }

    await fetchItems(searchTerm);
    setSaving(false);
    return true;
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Delete ${item.name}?`);
    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from("items").delete().eq("id", item.id);

    if (error) {
      setMessage({ type: "error", text: "Failed to delete item." });
      return;
    }

    if (editingItem?.id === item.id) {
      setEditingItem(null);
    }

    setMessage({ type: "success", text: "Item deleted successfully." });
    fetchItems(searchTerm);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <main className="min-h-screen px-3 py-5 sm:px-4 sm:py-8" style={{ background: "linear-gradient(180deg, #f0ede8 0%, #f5f3ef 100%)" }}>
      <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-6">

        {/* Header */}
        <header className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.50)", background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #222222 100%)", border: "1px solid #c8922a" }}>
          <div className="px-4 py-4 sm:px-7 sm:py-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
              <img
                src="/logo.png"
                alt=""
                className="h-12 w-auto sm:h-16 object-contain shrink-0"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight truncate">Fathima Traders</h1>
                <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase mt-0.5" style={{ color: "#f0c040" }}>Wholesale Shop&nbsp;·&nbsp;Price Tracker</p>
              </div>
            </div>
            <div className="hidden sm:block shrink-0">
              <div className="rounded-xl px-5 py-3 text-center" style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)" }}>
                <div className="text-3xl font-extrabold text-white">{loading ? "—" : items.length}</div>
                <div className="text-[11px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "#d4a843" }}>Products</div>
              </div>
            </div>
            <div className="sm:hidden shrink-0 flex flex-col items-center">
              <span className="text-2xl font-extrabold text-white">{loading ? "—" : items.length}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "#d4a843" }}>Items</span>
            </div>
          </div>
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, transparent 0%, #b87d20 10%, #f0c040 50%, #b87d20 90%, transparent 100%)" }} />
        </header>

        {/* Alert message */}
        {message.text ? (
          <div className={`rounded-xl px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2 ${messageClass}`}>
            {message.type === "success" ? (
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            ) : (
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            )}
            {message.text}
          </div>
        ) : null}

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <ItemForm
          editingItem={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          loading={saving}
        />

        <ItemList items={items} loading={loading} onEdit={setEditingItem} onDelete={handleDelete} />

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Fathima Traders &mdash; Wholesale Shop. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}

export default App;
