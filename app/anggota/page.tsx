export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { prisma } from "@/lib/prisma";
import { fallbackMembers } from "@/lib/fallback-data";

export default async function MembersPage() {
  let members: any[] = fallbackMembers;
  try {
    const dbMembers = await prisma.member.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
    members = dbMembers.length ? dbMembers : fallbackMembers;
  } catch {}

  return (
    <>
      <SiteHeader />
      <main className="bg-[#fffaf3] pt-28">
        <section className="border-b border-[#ead6bc] bg-[#fff7ea] py-16">
          <div className="container text-center">
            <Link href="/" className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#ead6bc] bg-white px-4 py-2 text-sm font-black text-[#8a4719] transition hover:-translate-y-0.5">
              <ArrowLeft className="h-4 w-4" />Kembali ke Beranda
            </Link>
            <p className="mt-8 text-sm font-black uppercase tracking-[.28em] text-[#c99213]">Struktur Organisasi</p>
            <h1 className="mt-3 text-balance text-5xl font-black leading-tight text-[#2f2119] md:text-7xl">Seluruh Anggota HPI Pulau Bintan</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#8f765f]">Data anggota dapat ditambah, diedit, dihapus, dan diperbarui fotonya melalui Dashboard Admin.</p>
            <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full bg-[#8a4719] px-5 py-3 text-sm font-black text-white"><Users className="h-4 w-4" />{members.length} Anggota Aktif</div>
          </div>
        </section>

        <section className="py-16">
          <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, index) => (
              <article key={member.id} className={`group relative min-h-[380px] overflow-hidden rounded-[1.75rem] border shadow-[0_22px_70px_rgba(70,42,24,.11)] transition duration-300 hover:-translate-y-2 ${index % 4 === 1 ? "border-[#f2d9ad] bg-[#fffaf1]" : "border-[#96551f]/20 bg-[#884416]"}`}>
                <div className="absolute left-7 top-7 h-12 w-12 rounded-tl-3xl border-l-2 border-t-2 border-[#ff9900]/55" />
                <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
                  <div className={`relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border-[6px] transition duration-500 group-hover:scale-105 ${index % 4 === 1 ? "border-[#ff9900] bg-white" : "border-[#b66a18] bg-[#77390f]"}`}>
                    <Image src={member.photo || "/member-dummy-1.jpeg"} alt={member.name} fill sizes="180px" className="object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className={`mt-8 rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[.24em] ${index % 4 === 1 ? "bg-[#884416] text-white" : "bg-[#a65a17] text-[#ffcf80]"}`}>{member.position}</div>
                  <h2 className={`mt-6 text-2xl font-black leading-tight ${index % 4 === 1 ? "text-[#2f2119]" : "text-white"}`}>{member.name}</h2>
                  {member.contact && <p className={`mt-3 text-sm font-semibold ${index % 4 === 1 ? "text-[#8f765f]" : "text-white/70"}`}>{member.contact}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
