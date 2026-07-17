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
          whileHover={{ y: -12, scale: 1.03 }}
          className={`group relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-zinc-950 shadow-[0_22px_70px_rgba(15,23,42,.14)] ${index === 0 ? "lg:col-span-2 lg:min-h-[440px]" : ""}`}
        >
          <Image
            src={member.photo || fallbackPhotos[index % fallbackPhotos.length]}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent opacity-90 transition duration-500 group-hover:opacity-75" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="inline-flex rounded-full bg-[#ff9900] px-3 py-1 text-[11px] font-black uppercase tracking-[.18em] text-white shadow-[0_14px_34px_rgba(255,153,0,.28)]">{member.position}</p>
            <h3 className="mt-4 text-2xl font-black leading-tight drop-shadow md:text-3xl">{member.name}</h3>
            <div className="mt-4 h-px w-20 bg-white/60 transition-all duration-500 group-hover:w-32 group-hover:bg-[#ff9900]" />
          </div>
        </motion.article>
      ))}
    </div>
  );
}
