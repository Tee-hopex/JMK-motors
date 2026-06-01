"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Star, X, Upload, ImageIcon, Search } from "lucide-react";
import { formatNaira } from "@/utils/format";
import Image from "next/image";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  condition: string;
  engine: string;
  drivetrain: string;
  seats: number;
  features: string[];
  images: string[];
  description: string;
  featured: boolean;
  sold: boolean;
}

const emptyForm = {
  make: "", model: "", year: 2022, price: 0, mileage: 0,
  fuelType: "Petrol", transmission: "Automatic", bodyType: "SUV",
  color: "", condition: "Foreign Used", engine: "", drivetrain: "AWD",
  seats: 5, features: [] as string[], images: [] as string[],
  description: "", featured: false, sold: false,
};
type FormData = typeof emptyForm;

const conditionColors: Record<string, string> = {
  "Foreign Used": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Nigerian Used": "bg-orange-500/15 text-orange-400 border-orange-500/20",
  "Brand New": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cars");
      setCars(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCars(); }, [loadCars]);

  const filtered = cars.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return `${c.year} ${c.make} ${c.model} ${c.color}`.toLowerCase().includes(q);
  });

  const openAdd = () => { setEditing(null); setForm(emptyForm); setFeatureInput(""); setShowForm(true); };

  const openEdit = (car: Car) => {
    setEditing(car);
    setForm({
      make: car.make, model: car.model, year: car.year, price: car.price,
      mileage: car.mileage, fuelType: car.fuelType, transmission: car.transmission,
      bodyType: car.bodyType, color: car.color, condition: car.condition,
      engine: car.engine, drivetrain: car.drivetrain, seats: car.seats,
      features: [...car.features], images: [...car.images],
      description: car.description, featured: car.featured, sold: car.sold,
    });
    setFeatureInput("");
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
      setForm((p) => ({ ...p, images: [...p.images, ...urls] }));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx: number) => setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  const addFeature = () => {
    const t = featureInput.trim();
    if (t && !form.features.includes(t)) setForm((p) => ({ ...p, features: [...p.features, t] }));
    setFeatureInput("");
  };
  const removeFeature = (f: string) => setForm((p) => ({ ...p, features: p.features.filter((x) => x !== f) }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/cars/${editing.id}` : "/api/cars";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setShowForm(false); loadCars(); }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/cars/${id}`, { method: "DELETE" });
    setDeleteId(null);
    loadCars();
  };

  const inputCls = "w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/15 transition-all placeholder-slate-500";

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">Management</p>
          <h1 className="text-2xl font-bold text-ink">Inventory</h1>
          {loading && <p className="text-slate-500 text-sm mt-1">Loading inventory...</p>}
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-yellow-500 text-dark text-sm font-bold rounded-xl transition-all shadow-lg shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          Add Car
        </button>
      </div>

      {/* Search + stats bar */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            aria-label="Search inventory"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold/30 transition-all"
          />
        </div>
        <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
          <span><span className="text-ink font-semibold">{cars.filter(c => !c.sold).length}</span> available</span>
          <span><span className="text-ink font-semibold">{cars.filter(c => c.sold).length}</span> sold</span>
          <span><span className="text-gold font-semibold">{cars.filter(c => c.featured).length}</span> featured</span>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface-2 border border-ink/6 rounded-xl h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-surface-2 border border-ink/6 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/6">
                <th className="text-left px-5 py-3.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Vehicle</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Condition</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th scope="col" className="px-4 py-3.5 w-20"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map((car) => (
                <tr key={car.id} className="hover:bg-ink/2 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-9 rounded-lg overflow-hidden bg-ink/4 flex-shrink-0 border border-ink/6">
                        {car.images[0] ? (
                          <Image src={car.images[0]} alt={car.model} width={44} height={36} className="object-cover w-full h-full" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-600 m-auto mt-2" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-ink font-medium text-sm">{car.year} {car.make} {car.model}</p>
                          {car.featured && <Star className="w-3 h-3 text-gold fill-gold" />}
                        </div>
                        <p className="text-slate-500 text-[11px]">{car.color} · {car.transmission}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-medium border ${conditionColors[car.condition] ?? "bg-ink/5 text-ink/60 border-ink/8"}`}>
                      {car.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-ink font-semibold text-sm">{formatNaira(car.price)}</p>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${car.sold ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${car.sold ? "bg-red-400" : "bg-emerald-400"}`} />
                      {car.sold ? "Sold" : "Available"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" aria-label="Edit vehicle" onClick={() => openEdit(car)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" aria-label="Delete vehicle" onClick={() => setDeleteId(car.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-500 text-sm">{search ? "No vehicles match your search" : "No vehicles yet"}</p>
            </div>
          )}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1520] border border-white/8 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Delete this car?</h3>
            <p className="text-slate-500 text-sm mb-6">This will permanently remove the listing and all associated reservations.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:bg-white/5 transition-all">Cancel</button>
              <button type="button" onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit drawer */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#0a0e16] border-l border-white/6 overflow-y-auto shadow-2xl">
            {/* Drawer header */}
            <div className="sticky top-0 bg-[#0a0e16]/95 backdrop-blur border-b border-white/6 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-base font-bold text-white">{editing ? "Edit Vehicle" : "Add New Vehicle"}</h2>
                <p className="text-slate-500 text-xs mt-0.5">{editing ? `${editing.year} ${editing.make} ${editing.model}` : "Fill in the vehicle details below"}</p>
              </div>
              <button type="button" aria-label="Close form" onClick={() => setShowForm(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Images */}
              <Field label="Photos">
                <div className="flex flex-wrap gap-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group w-20 h-16 rounded-xl overflow-hidden border border-white/8">
                      <Image src={url} alt="" fill className="object-cover" />
                      <button type="button" aria-label="Remove image" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <label className="w-20 h-16 rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center cursor-pointer hover:border-gold/40 hover:bg-gold/5 transition-all">
                    {uploading ? (
                      <span className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] text-slate-500 mt-1">Upload</span>
                      </>
                    )}
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Make">
                  <input type="text" value={form.make} onChange={(e) => setForm((p) => ({ ...p, make: e.target.value }))} className={inputCls} placeholder="e.g. Toyota" />
                </Field>
                <Field label="Model">
                  <input type="text" value={form.model} onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))} className={inputCls} placeholder="e.g. Camry" />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Year">
                  <input type="number" value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: parseInt(e.target.value) || 0 }))} className={inputCls} />
                </Field>
                <Field label="Price (₦)">
                  <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className={inputCls} />
                </Field>
                <Field label="Mileage (km)">
                  <input type="number" value={form.mileage} onChange={(e) => setForm((p) => ({ ...p, mileage: parseInt(e.target.value) || 0 }))} className={inputCls} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Fuel Type">
                  <select aria-label="Fuel type" value={form.fuelType} onChange={(e) => setForm((p) => ({ ...p, fuelType: e.target.value }))} className={inputCls}>
                    {["Petrol", "Diesel", "Hybrid", "Electric"].map((o) => <option key={o} value={o} className="bg-[#0f1520]">{o}</option>)}
                  </select>
                </Field>
                <Field label="Transmission">
                  <select aria-label="Transmission" value={form.transmission} onChange={(e) => setForm((p) => ({ ...p, transmission: e.target.value }))} className={inputCls}>
                    {["Automatic", "Manual"].map((o) => <option key={o} value={o} className="bg-[#0f1520]">{o}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Body Type">
                  <select aria-label="Body type" value={form.bodyType} onChange={(e) => setForm((p) => ({ ...p, bodyType: e.target.value }))} className={inputCls}>
                    {["SUV", "Sedan", "Coupe", "Hatchback", "Truck", "Wagon"].map((o) => <option key={o} value={o} className="bg-[#0f1520]">{o}</option>)}
                  </select>
                </Field>
                <Field label="Condition">
                  <select aria-label="Condition" value={form.condition} onChange={(e) => setForm((p) => ({ ...p, condition: e.target.value }))} className={inputCls}>
                    {["Foreign Used", "Nigerian Used", "Brand New"].map((o) => <option key={o} value={o} className="bg-[#0f1520]">{o}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Color">
                  <input type="text" value={form.color} onChange={(e) => setForm((p) => ({ ...p, color: e.target.value }))} className={inputCls} placeholder="Pearl White" />
                </Field>
                <Field label="Engine">
                  <input type="text" value={form.engine} onChange={(e) => setForm((p) => ({ ...p, engine: e.target.value }))} className={inputCls} placeholder="3.5L V6" />
                </Field>
                <Field label="Drivetrain">
                  <input type="text" value={form.drivetrain} onChange={(e) => setForm((p) => ({ ...p, drivetrain: e.target.value }))} className={inputCls} placeholder="AWD" />
                </Field>
              </div>

              <Field label="Seats">
                <input type="number" aria-label="Number of seats" value={form.seats} onChange={(e) => setForm((p) => ({ ...p, seats: parseInt(e.target.value) || 0 }))} className={`${inputCls} max-w-[100px]`} />
              </Field>

              {/* Features */}
              <Field label="Features">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="e.g. Sunroof, press Enter"
                    className={inputCls}
                  />
                  <button type="button" onClick={addFeature} className="px-4 py-2.5 bg-white/8 hover:bg-white/12 text-white text-sm rounded-xl transition-all flex-shrink-0">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.features.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 bg-white/6 border border-white/8 text-slate-300 text-xs px-2.5 py-1 rounded-lg">
                      {f}
                      <button type="button" aria-label={`Remove ${f}`} onClick={() => removeFeature(f)} className="hover:text-red-400 transition-colors ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Describe the vehicle..."
                />
              </Field>

              {/* Toggles */}
              <div className="flex gap-6 pt-1">
                {([["featured", "Featured listing", "text-gold"] as const, ["sold", "Mark as sold", "text-red-400"] as const]).map(([key, label, cls]) => (
                  <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setForm((p) => ({ ...p, [key]: !p[key] }))}
                      className={`w-9 h-5 rounded-full transition-all cursor-pointer flex items-center px-0.5 ${form[key] ? "bg-gold" : "bg-white/10"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all ${form[key] ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                    <span className={`text-sm ${form[key] ? cls : "text-slate-400"}`}>{label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-white/8 text-slate-300 text-sm hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-gold hover:bg-yellow-500 text-dark text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-gold/20">
                  {saving ? "Saving…" : editing ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
