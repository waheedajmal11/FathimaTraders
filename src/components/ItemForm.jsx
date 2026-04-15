import { useEffect, useState } from "react";
import { CATEGORIES } from "../constants/categories";

const initialValues = {
  name: "",
  category: "",
  piece_price: "",
  case_price: "",
};

function ItemForm({ editingItem, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editingItem) {
      setFormData(initialValues);
      setError("");
      return;
    }

    setFormData({
      name: editingItem.name,
      category: editingItem.category || "",
      piece_price: String(editingItem.piece_price),
      case_price: String(editingItem.case_price),
    });
    setError("");
  }, [editingItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedName = formData.name.trim();
    const piecePrice = Number(formData.piece_price);
    const casePrice = Number(formData.case_price);

    if (!cleanedName) {
      setError("Name is required.");
      return;
    }

    if (!formData.category) {
      setError("Category is required.");
      return;
    }

    if (piecePrice <= 0 || casePrice <= 0 || Number.isNaN(piecePrice) || Number.isNaN(casePrice)) {
      setError("Prices must be positive numbers.");
      return;
    }

    setError("");

    const success = await onSubmit({
      name: cleanedName,
      category: formData.category,
      piece_price: piecePrice,
      case_price: casePrice,
    });

    if (success) {
      setFormData(initialValues);
    }
  };

  const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 placeholder:text-slate-400";
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)", border: "1px solid #c8922a" }}>
      <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(240,192,64,0.18)" }}>
          {editingItem ? (
            <svg className="w-4 h-4" style={{ color: "#f0c040" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" style={{ color: "#f0c040" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>
        <h2 className="text-sm font-bold text-white tracking-wide">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelCls}>Item Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Marie Gold 5rs"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Piece Price</label>
            <input
              name="piece_price"
              type="number"
              min="0"
              step="0.01"
              value={formData.piece_price}
              onChange={handleChange}
              placeholder="0.00"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Case Price</label>
            <input
              name="case_price"
              type="number"
              min="0"
              step="0.01"
              value={formData.case_price}
              onChange={handleChange}
              placeholder="0.00"
              className={inputCls}
            />
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-rose-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-60 w-full sm:w-auto"
            style={{ background: loading ? "#b8862a" : "linear-gradient(135deg, #c8922a 0%, #e8a830 100%)", boxShadow: loading ? "none" : "0 3px 12px rgba(200,146,42,0.45)" }}
          >
            {loading ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
          </button>

          {editingItem ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 w-full sm:w-auto"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default ItemForm;
