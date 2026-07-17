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
          whileHover={{ y: -10, scale: 1.018 }}
          className={`group relative min-h-[390px] overflow-hidden rounded-[1.75rem] border shadow-[0_22px_70px_rgba(70,42,24,.12)] ${index === 1 ? "border-[#f2d9ad] bg-[#fffaf1]" : "border-[#96551f]/20 bg-[#884416]"}`}
        >
          <div className="absolute left-7 top-7 h-12 w-12 rounded-tl-3xl border-l-2 border-t-2 border-[#ff9900]/55" />
          <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
            <div className={`relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border-[6px] transition duration-500 group-hover:scale-105 ${index === 1 ? "border-[#ff9900] bg-white" : "border-[#b66a18] bg-[#77390f]"}`}>
              <Image
                src={member.photo || fallbackPhotos[index % fallbackPhotos.length]}
                alt={member.name}
                fill
                sizes="180px"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
            <div className={`mt-8 rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[.24em] ${index === 1 ? "bg-[#884416] text-white" : "bg-[#a65a17] text-[#ffcf80]"}`}>{member.position}</div>
            <h3 className={`mt-6 text-2xl font-black leading-tight md:text-3xl ${index === 1 ? "text-[#2f2119]" : "text-white"}`}>{member.name}</h3>
            <p className={`mt-3 text-sm font-semibold ${index === 1 ? "text-[#8f765f]" : "text-white/70"}`}>HPI Pulau Bintan</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
