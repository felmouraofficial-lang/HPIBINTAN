export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AnnouncementsPage() {
  const data = await prisma.announcement.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });
  return <><SiteHeader /><PageHero title="Pengumuman" description="Informasi terbaru untuk anggota dan masyarakat." /><main className="container grid gap-4 py-12">{data.map((a) => <Card key={a.id}>{(a.cover || a.thumbnail) && <Image src={a.cover || a.thumbnail || ""} alt={a.title} width={900} height={420} className="mb-5 h-64 w-full rounded-lg object-cover" />}<p className="text-sm text-zinc-500">{formatDate(a.publishedAt)}</p><h2 className="mt-1 text-xl font-black">{a.title}</h2><p className="mt-2 leading-7 text-zinc-600">{a.fullContent || a.content}</p>{a.pdfUrl && <Link href={a.pdfUrl} target="_blank" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-primary"><FileText className="h-4 w-4" />Unduh PDF</Link>}</Card>)}</main><SiteFooter /></>;
}
