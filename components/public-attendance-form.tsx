"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type Member = { id: string; name: string; position: string };
type Meeting = { id: string; title: string; date: Date; time: string; location: string };

export function DailyAttendanceForm({ members }: { members: Member[] }) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  return <form className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); startTransition(async () => { const file = form.get("photo"); if (file instanceof File && file.size > 0) { const upload = new FormData(); upload.append("file", file); const uploaded = await fetch("/api/upload", { method: "POST", body: upload }).then((r) => r.json()); form.set("photoUrl", uploaded.url); } const res = await fetch("/api/attendance/daily", { method: "POST", body: form }); setMessage(res.ok ? "Absensi harian berhasil dikirim." : "Absensi gagal. Coba lagi."); }); }}><select name="memberId" required className="h-12 rounded-xl border px-4"><option value="">Pilih anggota</option>{members.map((m) => <option key={m.id} value={m.id}>{m.name} - {m.position}</option>)}</select><select name="type" className="h-12 rounded-xl border px-4"><option value="checkin">Check In</option><option value="checkout">Check Out</option></select><input name="photo" type="file" accept="image/*" required className="rounded-xl border p-3" /><textarea name="notes" placeholder="Catatan lokasi/kegiatan" className="min-h-28 rounded-xl border p-4" /><Button type="submit" disabled={pending}>{pending ? "Mengirim..." : "Kirim Absensi Harian"}</Button>{message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</p>}</form>;
}

export function MeetingAttendanceForm({ members, meetings }: { members: Member[]; meetings: Meeting[] }) {
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  return <form className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); startTransition(async () => { const res = await fetch("/api/attendance/meeting", { method: "POST", body: form }); setMessage(res.ok ? "Absensi rapat berhasil dikirim." : "Absensi rapat gagal atau sudah pernah diisi."); }); }}><select name="meetingId" required className="h-12 rounded-xl border px-4"><option value="">Pilih rapat</option>{meetings.map((m) => <option key={m.id} value={m.id}>{m.title} - {m.time}</option>)}</select><select name="memberId" required className="h-12 rounded-xl border px-4"><option value="">Pilih anggota</option>{members.map((m) => <option key={m.id} value={m.id}>{m.name} - {m.position}</option>)}</select><select name="status" className="h-12 rounded-xl border px-4"><option value="PRESENT">Hadir</option><option value="LATE">Terlambat</option><option value="ABSENT">Tidak Hadir</option></select><Button type="submit" disabled={pending}>{pending ? "Mengirim..." : "Kirim Absensi Rapat"}</Button>{message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</p>}</form>;
}
