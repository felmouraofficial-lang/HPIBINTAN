export const dynamic = "force-dynamic";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { fallbackTransportation } from "@/lib/fallback-data";

export default async function TransportPage() {
  const published = await prisma.transportation.findMany({ where: { isPublished: true }, orderBy: { name: "asc" } }).catch(() => []);
  const existing = published.length ? published : await prisma.transportation.findMany({ orderBy: { name: "asc" } }).catch(() => []);
  const data: any[] = existing.length ? existing : fallbackTransportation;
  return <><SiteHeader /><PageHero title="Layanan Transportasi" description="Informasi kendaraan, kontak, harga, dan deskripsi layanan." /><main className="container grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">{data.map((t) => <Card key={t.id}><Image src={t.photo || "/logos/hpi-logo-2.jpeg"} alt={t.name} width={420} height={280} className="h-52 w-full rounded-lg object-cover" /><h2 className="mt-4 text-xl font-black">{t.name}</h2><p className="text-sm text-zinc-500">{t.category || t.vehicleType} - {t.capacity} orang</p><span className="mt-3 inline-block rounded-lg bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">{t.status === "AVAILABLE" ? "Tersedia" : "Tidak Tersedia"}</span><p className="mt-3 text-sm leading-6 text-zinc-600">{t.description}</p><p className="mt-3 text-sm font-bold text-zinc-700">{t.price || ""}</p>{t.whatsapp && <a href={`https://wa.me/${t.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-black text-white">WhatsApp</a>}</Card>)}</main><SiteFooter /></>;
}
