import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@hpibintan.org";
  const password = process.env.ADMIN_PASSWORD ?? "AdminHPI2026!";
  await prisma.admin.upsert({ where: { email }, update: {}, create: { email, password: await bcrypt.hash(password, 12), name: "Admin HPI Bintan" } });
  await prisma.organizationProfile.upsert({ where: { id: "main" }, update: {}, create: { id: "main", history: "DPC HPI Kabupaten Bintan adalah wadah profesional pramuwisata yang mendukung pariwisata Bintan melalui pelayanan, pengembangan kompetensi, dan kolaborasi lintas pemangku kepentingan.", vision: "Menjadi organisasi pramuwisata yang profesional, berintegritas, dan berdaya saing untuk kemajuan pariwisata Bintan.", mission: "Meningkatkan kompetensi anggota, memperkuat layanan informasi, menjaga etika profesi, dan membangun kolaborasi pariwisata yang berkelanjutan.", structure: "Ketua, Sekretaris, Bendahara, Bidang Keanggotaan, Bidang Pendidikan, Bidang Humas, dan Koordinator Lapangan.", heroSubtitle: "Company profile dan sistem informasi organisasi DPC HPI Kabupaten Bintan." } });
  await prisma.contact.upsert({ where: { id: "main" }, update: {}, create: { id: "main", address: "Kabupaten Bintan, Kepulauan Riau, Indonesia", email: "info@hpibintan.org", whatsapp: "+62 812-0000-0000", mapUrl: "https://maps.google.com/?q=Bintan" } });
  if ((await prisma.member.count()) === 0) {
    await prisma.member.createMany({ data: [
      ["Ardiansyah Putra", "Ketua DPC", "+62 812-4500-1101"], ["Maya Sari", "Wakil Ketua", "+62 812-4500-1102"], ["Rizal Maulana", "Sekretaris", "+62 812-4500-1103"], ["Dewi Lestari", "Bendahara", "+62 812-4500-1104"], ["Fahmi Ramadhan", "Koordinator Lapangan", "+62 812-4500-1105"], ["Nadia Prameswari", "Koordinator Pelatihan", "+62 812-4500-1106"], ["Bima Saputra", "Pramuwisata", "+62 812-4500-1107"], ["Siti Nurhaliza", "Pramuwisata", "+62 812-4500-1108"]
    ].map(([name, position, contact], index) => ({ name, position, contact, photo: `https://images.unsplash.com/photo-${[1500648767791,1494790108377,1506794778202,1438761681033,1507003211169,1534528741775,1507591064344,1544005313][index]}?auto=format&fit=crop&w=900&q=80`, isActive: true })) });
  }
  if ((await prisma.announcement.count()) === 0) {
    await prisma.announcement.createMany({ data: [
      { title: "Pelatihan Guide Nasional 2026", content: "HPI Bintan membuka pendaftaran pelatihan peningkatan kompetensi pramuwisata untuk standar pelayanan destinasi internasional.", isPublished: true },
      { title: "Rapat Bulanan Pengurus dan Anggota", content: "Rapat koordinasi bulanan membahas agenda kegiatan, pelayanan wisata, dan program kerja lintas bidang.", isPublished: true },
      { title: "Workshop Pariwisata Berkelanjutan", content: "Kegiatan kolaboratif bersama mitra destinasi untuk memperkuat narasi wisata alam, budaya, dan hospitality Bintan.", isPublished: true }
    ] });
  }
  if ((await prisma.gallery.count()) === 0) {
    await prisma.gallery.createMany({ data: [
      ["Pelatihan Interpretasi Destinasi", "PHOTO", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"],
      ["Kunjungan Wisata Bintan", "PHOTO", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"],
      ["Rapat Koordinasi Bulanan", "PHOTO", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"],
      ["Seminar Hospitality", "PHOTO", "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],
      ["Video Profil Layanan", "VIDEO", "/uploads/.gitkeep"]
    ].map(([title, category, fileUrl]) => ({ title, category: category as any, fileUrl, description: "Dokumentasi kegiatan HPI Bintan." })) });
  }
  if ((await prisma.documentation.count()) === 0) {
    await prisma.documentation.createMany({ data: ["AD/ART HPI Bintan", "Surat Keputusan Kepengurusan", "Program Kerja Tahunan", "Laporan Tahunan Organisasi", "Panduan Anggota Baru"].map((title) => ({ title, fileUrl: "/uploads/.gitkeep", fileType: "PDF", description: "Dokumen organisasi yang dapat diperbarui melalui dashboard admin." })) });
  }
  if ((await prisma.transportation.count()) === 0) {
    await prisma.transportation.createMany({ data: [
      ["Toyota Hiace Premio", "Van Premium", 12, "AVAILABLE", "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"],
      ["Toyota Hiace Commuter", "Van Wisata", 14, "AVAILABLE", "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=1200&q=80"],
      ["Toyota Innova Zenix", "MPV", 6, "AVAILABLE", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"],
      ["Toyota Alphard", "Executive MPV", 5, "UNAVAILABLE", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"],
      ["Bus Pariwisata", "Bus", 32, "AVAILABLE", "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"],
      ["Speed Boat", "Transportasi Laut", 10, "AVAILABLE", "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80"]
    ].map(([name, vehicleType, capacity, status, photo]) => ({ name: name as string, vehicleType: vehicleType as string, capacity: capacity as number, status: status as any, photo: photo as string, description: "Unit layanan transportasi mitra untuk kebutuhan perjalanan wisata dan kegiatan organisasi." })) });
  }
  if ((await prisma.meeting.count()) === 0) {
    await prisma.meeting.createMany({ data: [
      { title: "Agenda Sertifikasi Kompetensi", date: new Date("2026-08-12"), time: "09.00 WIB", location: "Bintan Tourism Center", description: "Koordinasi persiapan sertifikasi dan kurasi peserta." },
      { title: "Forum Mitra Pariwisata", date: new Date("2026-08-24"), time: "14.00 WIB", location: "Lagoi Bay", description: "Pertemuan dengan mitra transportasi, hotel, dan destinasi." },
      { title: "Rapat Program Kerja Triwulan", date: new Date("2026-09-05"), time: "10.00 WIB", location: "Sekretariat HPI Bintan", description: "Evaluasi program dan penyusunan agenda lanjutan." }
    ] });
  }
  const settings = { active_members: "127", transportation_units: "38", documentation_count: "56", activities_count: "112", partners_count: "15", gallery_count: "24", videos_count: "8" };
  for (const [key, value] of Object.entries(settings)) await prisma.settings.upsert({ where: { key }, update: { value }, create: { key, value } });
}

main().finally(async () => prisma.$disconnect());
