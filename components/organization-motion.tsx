"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MemberCard = { id: string; name: string; position: string; photo?: string | null };

const fallbackPhotos = ["/member-dummy-1.jpeg", "/member-dummy-2.jpeg", "/member-dummy-3.jpeg", "/uploads/1784221461556-45d0d916-4095-4a31-b7f1-8a639e67d2d9.jpg"];

export function OrganizationMotion({ members }: { members: MemberCard[] }) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, index) => (
        <motion.article
          key={member.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: index * 0.04, duration: 0.5, ease: "easeOut" }}
          className="group h-[390px] perspective-1000"
        >
          <div className="relative h-full rounded-[1.75rem] transition duration-700 preserve-3d group-hover:rotate-y-180">
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-[#96551f]/20 bg-[#8a4719] p-8 text-center shadow-[0_22px_70px_rgba(70,42,24,.12)] backface-hidden">
              <div className="absolute left-7 top-7 h-12 w-12 rounded-tl-3xl border-l-2 border-t-2 border-[#ff9900]/65" />
              <div className="grid h-full place-items-center">
                <div>
                  <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-[#ff9900]/25 bg-[#9b541b] text-4xl font-black italic text-[#ff9900] shadow-inner">HPI</div>
                  <div className="mx-auto mt-10 w-fit rounded-full bg-[#b96a17] px-8 py-3 text-[11px] font-black uppercase tracking-[.26em] text-[#ffd18a]">{member.position}</div>
                  <p className="mt-6 text-xs font-black uppercase tracking-[.26em] text-white/70">Kepengurusan</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rotate-y-180 overflow-hidden rounded-[1.75rem] border border-[#f2d9ad] bg-[#fffaf1] px-6 py-10 text-center shadow-[0_22px_70px_rgba(70,42,24,.12)] backface-hidden">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border-[6px] border-[#ff9900] bg-white">
                  <Image src={member.photo || fallbackPhotos[index % fallbackPhotos.length]} alt={member.name} fill sizes="180px" className="object-cover" />
                </div>
                <div className="mt-8 rounded-full bg-[#884416] px-5 py-2 text-[11px] font-black uppercase tracking-[.24em] text-white">{member.position}</div>
                <h3 className="mt-6 text-2xl font-black leading-tight text-[#2f2119] md:text-3xl">{member.name}</h3>
                <p className="mt-3 text-sm font-semibold text-[#8f765f]">HPI Pulau Bintan</p>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
