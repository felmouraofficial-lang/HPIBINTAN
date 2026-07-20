export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Images } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { prisma } from "@/lib/prisma";
type GalleryItem = { id: string; title: string; category: "PHOTO" | "VIDEO"; fileUrl: string; thumbnail?: string | null; caption?: string | null; description?: string | null };

export default async function GalleryPage() {
  const data: GalleryItem[] = await prisma.gallery.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  const meetingPhotos = data.filter((item) => item.fileUrl.includes("/foto-rapat/"));
  const meetingCover = meetingPhotos[0]?.thumbnail || meetingPhotos[0]?.fileUrl || "/hero-bintan.jpg";
  const meetingCount = meetingPhotos.length;
  const regularItems = data.filter((item) => !item.fileUrl.includes("/foto-rapat/"));

  return (
    <>
      <SiteHeader />
      <PageHero title="Galeri" description="Dokumentasi foto dan video kegiatan DPC HPI Kepulauan Bintan." />
      <main className="bg-[var(--surface)] py-14">
        <div className="container">
          <>
            <Link href="/galeri/dokumentasi-rapat" className="group grid overflow-hidden rounded-[2rem] bg-[#f3e1bd] shadow-[0_26px_80px_rgba(47,33,25,.13)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(47,33,25,.2)] lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[340px] overflow-hidden lg:min-h-[420px]">
                <Image src={meetingCover} alt="Dokumentasi Rapat HPI Bintan" fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/0 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-[#8a4719] shadow-sm"><Images className="h-4 w-4" /> Album Kegiatan</span>
                <h2 className="mt-6 text-4xl font-black leading-tight text-[#2f2119] md:text-5xl">Dokumentasi Rapat</h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-[#5f4a38]">Kumpulan foto rapat pengurus dan koordinasi anggota DPC HPI Kepulauan Bintan. Album ini merangkum suasana diskusi, evaluasi program, serta penyelarasan agenda organisasi.</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#2f2119] shadow-sm">{meetingCount} foto tersedia</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#2f2119] px-5 py-3 text-sm font-black text-white transition group-hover:bg-primary">Lihat Album <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          </>

          {regularItems.length > 0 && (
            <section className="mt-12">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.22em] text-primary">Galeri Lainnya</p>
                  <h2 className="mt-2 text-3xl font-black text-zinc-950 dark:text-white">Dokumentasi kegiatan lainnya</h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regularItems.map((item) => (
                  <article key={item.id} className="group overflow-hidden rounded-[1.65rem] bg-white shadow-soft transition duration-300 hover:-translate-y-1 dark:bg-white/8">
                    <div className="relative h-64 overflow-hidden">
                      {item.category === "VIDEO" ? <video src={item.fileUrl} controls poster={item.thumbnail || undefined} className="h-full w-full object-cover" /> : <Image src={item.thumbnail || item.fileUrl} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                    </div>
                    <div className="p-5">
                      <Camera className="h-5 w-5 text-primary" />
                      <h3 className="mt-3 text-xl font-black text-zinc-950 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-zinc-500">{item.caption || item.category}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}


