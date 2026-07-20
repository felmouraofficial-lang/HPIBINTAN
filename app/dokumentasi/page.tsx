export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileDown, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { prisma } from "@/lib/prisma";
type DocumentItem = { id: string; title: string; fileUrl: string; fileType: string; thumbnail?: string | null; category?: string | null; description?: string | null };

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(url) || url.startsWith("data:image/");
}

export default async function DocumentsPage() {
  const data: DocumentItem[] = await prisma.documentation.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <SiteHeader />
      <PageHero title="Dokumentasi" description="Arsip kegiatan, dokumen organisasi, dan bahan administrasi HPI Pulau Bintan." />
      <main className="bg-[var(--surface)] py-14">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-black/5 bg-white/82 p-5 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-white/8">
            <div>
              <p className="text-xs font-black uppercase tracking-[.22em] text-primary">Library</p>
              <h2 className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">Galeri dokumen dan foto kegiatan</h2>
            </div>
            <div className="flex h-12 items-center gap-3 rounded-full bg-zinc-100 px-4 text-sm font-semibold text-zinc-500 dark:bg-white/10 dark:text-zinc-300">
              <Search className="h-4 w-4" />
              <span>{data.length} arsip tersedia</span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.map((item, index) => {
              const imageCover = Boolean(item.thumbnail) || isImageUrl(item.fileUrl);
              return (
                <article key={item.id} className="group overflow-hidden rounded-[1.6rem] border border-black/5 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(20,20,20,.15)] dark:border-white/10 dark:bg-white/8">
                  <div className="relative m-3 h-56 overflow-hidden rounded-[1.25rem] bg-[#efe4d0]">
                    {imageCover ? (
                      <Image src={item.thumbnail || item.fileUrl} alt={item.title} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#f7ead2,#fff,#d9edf7)]">
                        <FileDown className="h-16 w-16 text-primary" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/4 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-[.16em] text-primary shadow-sm">{item.fileType || "DOC"}</span>
                    <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-950 shadow-lg transition group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-white">{index + 1}</span>
                  </div>
                  <div className="px-5 pb-5">
                    <h3 className="text-xl font-black leading-tight text-zinc-950 dark:text-white">{item.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.description || item.category || ""}</p>
                    <Link href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-white transition hover:bg-primary dark:bg-white dark:text-zinc-950">
                      Buka Arsip <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
