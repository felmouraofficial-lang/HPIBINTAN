import Link from "next/link";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, CalendarCheck, Images, FileText, Bus, Megaphone, Contact, Home, Building2, MapPinned } from "lucide-react";

const items = [["Dashboard", "/admin/dashboard", LayoutDashboard], ["Beranda/Tentang", "/admin/content", Home], ["Destinasi", "/admin/destinations", MapPinned], ["Anggota", "/admin/members", Users], ["Absensi Harian", "/admin/attendance", CalendarCheck], ["Absensi Rapat", "/admin/meetings", Building2], ["Galeri", "/admin/gallery", Images], ["Dokumentasi", "/admin/documents", FileText], ["Transportasi", "/admin/transportation", Bus], ["Pengumuman", "/admin/announcements", Megaphone], ["Kontak", "/admin/contact", Contact]];

export async function AdminShell({ children }: { children: ReactNode }) {
  const adminCookie = (await cookies()).get("hpi_admin")?.value;
  if (!adminCookie) redirect("/admin/login");
  return <div className="min-h-screen bg-[#f7f7f4] lg:grid lg:grid-cols-[290px_1fr]"><aside className="border-r border-zinc-200 bg-white/90 p-5 backdrop-blur"><Link href="/" className="block rounded-2xl bg-zinc-950 p-5 text-white shadow-soft"><span className="text-lg font-black">HPI Bintan Admin</span><span className="mt-1 block text-xs font-semibold uppercase tracking-[.18em] text-gold">Control Center</span></Link><nav className="mt-8 grid gap-1">{items.map(([label, href, Icon]) => <Link key={href as string} href={href as string} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-zinc-700 transition hover:bg-red-50 hover:text-primary"><Icon className="h-4 w-4" />{label as string}</Link>)}</nav><form action="/api/admin/logout" method="post" className="mt-8"><button className="w-full rounded-xl border border-zinc-200 px-3 py-3 text-left text-sm font-black text-zinc-500 transition hover:border-primary hover:text-primary">Logout</button></form></aside><main className="p-5 lg:p-8">{children}</main></div>;
}
