export const dynamic = "force-dynamic";

import { Camera, CheckCircle2, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { DailyAttendanceForm } from "@/components/public-attendance-form";
import { prisma } from "@/lib/prisma";

export default async function DailyAttendancePage() {
  const members = await prisma.member.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true, position: true } });
  return <><SiteHeader /><PageHero title="Absensi Harian Staff" description="Anggota melakukan check in atau check out mandiri dengan bukti foto. Data otomatis masuk ke dashboard admin." /><main className="container grid gap-8 py-14 lg:grid-cols-[.8fr_1.2fr]"><div className="grid gap-4"><Card><Camera className="text-primary" /><h2 className="mt-4 text-xl font-black">Wajib Upload Foto</h2><p className="mt-2 leading-7 text-zinc-600">Foto digunakan sebagai bukti kehadiran dan akan tersimpan pada riwayat absensi admin.</p></Card><Card><Clock className="text-primary" /><h2 className="mt-4 text-xl font-black">Check In / Check Out</h2><p className="mt-2 leading-7 text-zinc-600">Pilih tipe absensi sesuai kondisi di lapangan.</p></Card><Card><CheckCircle2 className="text-primary" /><h2 className="mt-4 text-xl font-black">Terekam Otomatis</h2><p className="mt-2 leading-7 text-zinc-600">Waktu submit dicatat otomatis oleh sistem.</p></Card></div><DailyAttendanceForm members={members} /></main><SiteFooter /></>;
}
