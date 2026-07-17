"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Pencil, Plus, Search, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FieldType = "text" | "textarea" | "number" | "select" | "date" | "file";
export type Field = { name: string; label: string; type?: FieldType; options?: string[]; required?: boolean; accept?: string };

function isFileField(field: Field) {
  return field.type === "file" || ["fileUrl", "thumbnail", "photo"].includes(field.name);
}

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload gagal");
  const data = await res.json();
  return String(data.url);
}

export function AdminCrud({ title, resource, fields }: { title: string; resource: string; fields: Field[] }) {
  const [rows, setRows] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
      if (!res.ok) setToast(data?.error ?? "Data belum bisa dimuat");
    } catch {
      setRows([]);
      setToast("Data belum bisa dimuat. Cek koneksi database di Vercel.");
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const shown = filtered.slice((page - 1) * 8, page * 8);

  async function submit(form: FormData) {
    setSaving(true);
    try {
      const data: Record<string, FormDataEntryValue | null> = {};
      for (const field of fields) {
        if (isFileField(field)) {
          const file = form.get(field.name);
          data[field.name] = file instanceof File && file.size > 0 ? await uploadFile(file) : editing?.[field.name] ?? "";
        } else {
          data[field.name] = form.get(field.name);
        }
      }
      const method = editing?.id ? "PUT" : "POST";
      const url = editing?.id ? `/api/admin/${resource}/${editing.id}` : `/api/admin/${resource}`;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.error ?? "Simpan data gagal");
      }
      setEditing(null);
      setToast("Data tersimpan");
      await load();
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Upload atau simpan data gagal. Cek format file lalu coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Hapus data ini?")) return;
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      setToast(error?.error ?? "Hapus data gagal");
      return;
    }
    setToast("Data dihapus");
    await load();
  }

  return <div className="grid gap-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-3xl font-black">{title}</h1><p className="text-sm text-zinc-500">Kelola data, upload file, pencarian, pagination, dan hapus data.</p></div>
      <Button onClick={() => setEditing({})}><Plus className="mr-2 h-4 w-4" />Tambah</Button>
    </div>
    {toast && <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{toast}</div>}
    <Card>
      <div className="mb-4 flex items-center gap-2 rounded-lg border px-3"><Search className="h-4 w-4 text-zinc-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari atau filter data..." className="h-11 w-full outline-none" /></div>
      {loading ? <div className="grid gap-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-zinc-100" />)}</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b">{fields.slice(0, 4).map((f) => <th key={f.name} className="py-3 pr-4 font-bold">{f.label}</th>)}<th>Aksi</th></tr></thead><tbody>{shown.map((row) => <tr key={row.id} className="border-b last:border-0">{fields.slice(0, 4).map((f) => <td key={f.name} className="max-w-52 truncate py-3 pr-4">{String(row[f.name] ?? "-")}</td>)}<td className="flex gap-2 py-2"><button className="rounded-lg border p-2" onClick={() => setEditing(row)}><Pencil className="h-4 w-4" /></button><button className="rounded-lg border p-2 text-primary" onClick={() => remove(row.id)}><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>}
      <div className="mt-4 flex justify-between text-sm"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Sebelumnya</button><span>Halaman {page}</span><button disabled={page * 8 >= filtered.length} onClick={() => setPage(page + 1)}>Berikutnya</button></div>
    </Card>
    {editing && <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><form action={submit} className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-5 shadow-soft"><h2 className="text-xl font-black">{editing.id ? "Edit" : "Tambah"} {title}</h2><div className="mt-5 grid gap-4">{fields.map((f) => <label key={f.name} className="grid gap-1 text-sm font-semibold">{f.label}{f.type === "textarea" ? <textarea name={f.name} defaultValue={editing[f.name] ?? ""} required={f.required} className="min-h-28 rounded-lg border p-3" /> : f.type === "select" ? <select name={f.name} defaultValue={editing[f.name] ?? f.options?.[0]} className="h-11 rounded-lg border px-3">{f.options?.map((o) => <option key={o} value={o}>{o}</option>)}</select> : isFileField(f) ? <div className="grid gap-2 rounded-xl border border-dashed border-zinc-300 p-4"><div className="flex items-center gap-2 text-zinc-600"><UploadCloud className="h-4 w-4" />Upload file dari komputer</div><input name={f.name} type="file" accept={f.accept ?? "image/*,application/pdf,.doc,.docx,video/mp4"} required={f.required && !editing?.[f.name]} className="rounded-lg border p-2" />{editing?.[f.name] && <span className="truncate text-xs font-medium text-zinc-500">File saat ini: {editing[f.name]}</span>}</div> : <input name={f.name} type={f.type ?? "text"} defaultValue={editing[f.name] ?? ""} required={f.required} className="h-11 rounded-lg border px-3" />}</label>)}</div><div className="mt-5 flex justify-end gap-2"><button type="button" className="rounded-lg border px-4 py-2" onClick={() => setEditing(null)}>Batal</button><Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button></div></form></div>}
  </div>;
}
