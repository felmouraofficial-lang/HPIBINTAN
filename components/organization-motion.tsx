"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MemberCard = { id: string; name: string; position: string; photo?: string | null };

export function OrganizationMotion({ members }: { members: MemberCard[] }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((member, index) => <motion.article key={member.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04, duration: 0.45 }} whileHover={{ y: -10, scale: 1.015 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur-xl"><div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-zinc-900"><Image src={member.photo || "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80"} alt={member.name} fill className="object-cover opacity-80 grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" /><div className="absolute bottom-0 p-5 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-gold">{member.position}</p><h3 className="mt-2 text-2xl font-black leading-tight">{member.name}</h3></div></div></motion.article>)}</div>;
}
