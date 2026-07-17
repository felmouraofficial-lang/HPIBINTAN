"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ImagePlus, MapPin, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Destination = {
  category: string;
  name: string;
  description: string;
  location: string;
  image: string;
  mapUrl?: string;
};

const emptyDestination: Destination = {
  category: "Wisata Pantai",
  name: "",
  description: "",
  location: "Pulau Bintan",
  image: "/head-background.jpg",
  mapUrl: "",
};

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Upload foto gagal");
  return String(data.url);
}

export function AdminDestinationsManager({ initialDestinations }: { initialDestinations: Destination[] }) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Destination>(emptyDestination);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const categories = useMemo(() => Array.from(new Set(destinations.map((item) => item.category).filter(Boolean))), [destinations]);

  function startAdd() {
    setEditingIndex(null);
    setDraft({ ...emptyDestination });
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setDraft({ ...destinations[index] });
  }

  function applyDraft() {
    if (!draft.name.trim()) {
      setToast({ type: "error", message: "Nama destinasi wajib diisi." });
      return;
    }
    if (!draft.description.trim()) {
      setToast({ type: "error", message: "Deskripsi destinasi wajib diisi." });
      return;
    }

    const next = [...destinations];
    const cleanDraft = { ...draft, name: draft.name.trim(), category: draft.category.trim() || "Wisata", location: draft.location.trim() || "Pulau Bintan" };
    if (editingIndex === null) next.unshift(cleanDraft);
    else next[editingIndex] = cleanDraft;
    setDestinations(next);
    setEditingIndex(null);
    setDraft({ ...emptyDestination });
    setToast({ type: "success", message: "Perubahan masuk ke daftar. Klik Simpan Semua agar tampil di halaman utama." });
  }

  async function handleUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setDraft((value) => ({ ...value, image: url }));
      setToast({ type: "success", message: "Foto berhasil diupload." });
    } catch (error) {
      setToast({ type: "error", message: error instanceof Error ? error.message : "Upload foto gagal." });
    } finally {
      setUploading(false);
    }
  }

  function remove(index: number) {
    if (!confirm("Hapus destinasi ini?")) return;
    setDestinations(destinations.filter((_, itemIndex) => itemIndex !== index));
    setToast({ type: "success", message: "Destinasi dihapus dari daftar. Klik Simpan Semua untuk menerapkan." });
  }

  async function saveAll() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/destinations", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ destinations }) });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Destinasi gagal disimpan");
      setDestinations(data.destinations ?? destinations);
      setToast({ type: "success", message: data.message ?? "Destinasi berhasil disimpan." });
    } catch (error) {
      setToast({ type: "error", message: error instanceof Error ? error.message : "Destinasi gagal disimpan." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-[2rem] bg-zinc-950 p-8 text-white shadow-soft">
        <p className="text-sm font-black uppercase tracking-[.2em] text-gold">Destination CMS</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">Kelola Destinasi Wisata</h1>
            <p className="mt-3 max-w-3xl text-zinc-300">Tambah, edit, hapus, upload foto, ubah link Google Maps, dan deskripsi destinasi yang tampil di halaman utama.</p>
          </div>
          <Button type="button" onClick={saveAll} disabled={saving} className="bg-white text-zinc-950 hover:bg-gold">
            <Save className="mr-2 h-4 w-4" />{saving ? "Menyimpan..." : "Simpan Semua"}
          </Button>
        </div>
      </div>

      {toast && <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${toast.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{toast.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}{toast.message}</div>}

      <section className="grid gap-5 rounded-[2rem] bg-white p-5 shadow-soft lg:grid-cols-[.85fr_1.15fr]">
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Form Destinasi</h2>
            <button type="button" onClick={startAdd} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-white"><Plus className="h-4 w-4" />Baru</button>
          </div>

          <label className="grid gap-1 text-sm font-bold">Nama Destinasi<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Contoh: Lagoi Bay" className="h-11 rounded-xl border px-3" /></label>
          <label className="grid gap-1 text-sm font-bold">Kategori<input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} list="destination-categories" placeholder="Wisata Pantai / Wisata Alam / Sejarah" className="h-11 rounded-xl border px-3" /><datalist id="destination-categories">{["Wisata Pantai", "Wisata Alam", "Wisata Sejarah & Budaya", ...categories].map((category) => <option key={category} value={category} />)}</datalist></label>
          <label className="grid gap-1 text-sm font-bold">Lokasi<input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} placeholder="Contoh: Lagoi, Bintan" className="h-11 rounded-xl border px-3" /></label>
          <label className="grid gap-1 text-sm font-bold">Link Google Maps<input value={draft.mapUrl ?? ""} onChange={(e) => setDraft({ ...draft, mapUrl: e.target.value })} placeholder="https://www.google.com/maps/..." className="h-11 rounded-xl border px-3" /></label>
          <label className="grid gap-1 text-sm font-bold">Deskripsi<textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Tulis deskripsi destinasi..." className="min-h-28 rounded-xl border p-3" /></label>
          <label className="grid gap-2 rounded-xl border border-dashed border-zinc-300 p-4 text-sm font-bold"><span className="flex items-center gap-2"><ImagePlus className="h-4 w-4" />Upload Foto Destinasi</span><input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files?.[0] ?? null)} className="rounded-lg border p-2" /><span className="truncate text-xs text-zinc-500">{uploading ? "Mengupload..." : `Foto saat ini: ${draft.image}`}</span></label>

          {draft.image && <div className="relative h-56 overflow-hidden rounded-2xl bg-zinc-100"><Image src={draft.image} alt={draft.name || "Preview destinasi"} fill sizes="420px" className="object-cover" /></div>}
          <Button type="button" onClick={applyDraft}>{editingIndex === null ? "Tambahkan ke Daftar" : "Update Destinasi"}</Button>
        </div>

        <div>
          <div className="mb-4 grid gap-3 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-3">
            <div><p className="text-xs font-black uppercase tracking-[.16em] text-zinc-400">Total</p><p className="text-3xl font-black">{destinations.length}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[.16em] text-zinc-400">Kategori</p><p className="text-3xl font-black">{categories.length}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[.16em] text-zinc-400">Status</p><p className="mt-2 text-sm font-black text-green-700">Siap Sinkron</p></div>
          </div>

          <div className="grid max-h-[760px] gap-3 overflow-auto pr-1">
            {destinations.map((item, index) => (
              <article key={`${item.name}-${index}`} className="grid gap-3 rounded-2xl border border-zinc-200 p-3 sm:grid-cols-[150px_1fr_auto]">
                <div className="relative h-36 overflow-hidden rounded-xl bg-zinc-100"><Image src={item.image || "/head-background.jpg"} alt={item.name} fill sizes="160px" className="object-cover" /></div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-primary">{item.category}</p>
                  <h3 className="mt-1 truncate text-xl font-black">{item.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-zinc-500"><MapPin className="h-4 w-4" />{item.location}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <button type="button" onClick={() => startEdit(index)} className="rounded-xl border p-3 text-zinc-700 transition hover:border-primary hover:text-primary" title="Edit"><Pencil className="h-4 w-4" /></button>
                  <button type="button" onClick={() => remove(index)} className="rounded-xl border p-3 text-primary transition hover:bg-red-50" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
