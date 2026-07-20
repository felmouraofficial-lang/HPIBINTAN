export const dynamic = "force-dynamic";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { MeetingAttendanceForm } from "@/components/public-attendance-form";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function MeetingAttendancePage() {
  const [members, meetings] = await Promise.all([prisma.member.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true, position: true } }), prisma.meeting.findMany({ orderBy: { date: "asc" }, take: 12, select: { id: true, title: true, date: true, time: true, location: true, description: true } })]);
  return <><SiteHeader /><PageHero title="Absensi Rapat" description="Admin membuat jadwal rapat, lalu staff mengisi kehadiran dari halaman publik ini." /><main className="container grid gap-8 py-14 lg:grid-cols-[.9fr_1.1fr]"><div><h2 className="text-3xl font-black">Jadwal Rapat Aktif</h2><div className="mt-5 grid gap-4">{meetings.map((m) => <Card key={m.id}><CalendarDays className="text-primary" /><p className="mt-4 text-sm font-bold text-zinc-500">{formatDate(m.date)} - {m.time}</p><h3 className="mt-2 text-xl font-black">{m.title}</h3><p className="mt-2 flex items-center gap-2 text-sm font-bold text-primary"><MapPin className="h-4 w-4" />{m.location}</p><p className="mt-2 text-sm leading-6 text-zinc-600">{m.description}</p></Card>)}</div></div><div><Card className="mb-5"><Users className="text-primary" /><h2 className="mt-4 text-xl font-black">Form Kehadiran Peserta</h2><p className="mt-2 leading-7 text-zinc-600">Pilih rapat, nama anggota, dan status kehadiran.</p></Card><MeetingAttendanceForm members={members} meetings={meetings} /></div></main><SiteFooter /></>;
}
