const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const contact = {
  id: "main",
  address: "Jl. Langsat RT.001 / RW.001, Desa Sebong Lagoi, Kec. Teluk Sebong, Kab. Bintan.",
  email: "info@hpibintan.org",
  whatsapp: "+62 812 7565 7026",
  mapUrl: "https://maps.google.com/?q=Jl.%20Langsat%20Desa%20Sebong%20Lagoi%20Teluk%20Sebong%20Bintan",
};

const memberNames = [
  "Abdul Rahman", "Ahmad Syarif H", "Aliyadi", "M. Zikril Isril", "Sumardin",
  "Chairil Anwar", "Khoirol", "Bakrim Bere", "M. Mukarrom", "Ansori",
  "Iwan", "Bung Seng", "AngTonio", "Basrah", "Jono",
  "Hariyanto", "Tutas Wahyu", "Erwin", "Indal Desri Putra", "Daniesl Samosir",
  "Suhairi", "Rio", "Yanto", "Ardi Yent", "Qiu Ran",
  "Sung Tiam", "Usman Syamnai", "Riska Triafani", "Rifqi Mangihuttua Hasibuan", "Hengki",
  "Erni Harjayanti", "Andre Soemantrei", "Taufik Hidayat", "Lela Wirdyanti", "Putri Adliana Hasibuan",
  "Roshamidah", "Melanie", "Diko Pahlevi Alfatoni", "Hamdi", "Parjo Nurgiyanto",
  "Heri", "Sudarwadi", "Bambang Sutejo", "Nur Hasidah", "Anugrah Candra",
  "Marwan", "Sandi Parulian",
];

const memberPositions = ["Ketua DPC", "Wakil Ketua", "Sekretaris", "Bendahara", "Koordinator Lapangan", "Koordinator Pelatihan", "Bidang Humas", "Bidang Keanggotaan"];
const memberPhotos = ["/member-dummy-1.jpeg", "/member-dummy-2.jpeg", "/member-dummy-3.jpeg", "/uploads/1784221305257-f652719a-d758-47ae-ae59-a9beca92924e.jpg"];

const galleryItems = [
  ["Kegiatan Rapat Pengurus", "/foto-rapat/rapat-01.jpeg"],
  ["Rapat Koordinasi Anggota", "/foto-rapat/rapat-02.jpeg"],
  ["Dokumentasi Rapat Bulanan", "/foto-rapat/rapat-03.jpeg"],
  ["Suasana Rapat HPI Bintan", "/foto-rapat/rapat-04.jpeg"],
  ["Pelatihan Interpretasi Destinasi", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85"],
  ["Kunjungan Wisata Bintan", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"],
];

const documents = [
  ["Dokumentasi Rapat Pengurus", "/foto-rapat/rapat-05.jpeg", "JPG"],
  ["Album Rapat Anggota", "/foto-rapat/rapat-06.jpeg", "JPG"],
  ["AD/ART HPI Bintan", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85", "PDF"],
  ["Surat Keputusan Kepengurusan", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85", "PDF"],
  ["Program Kerja Tahunan", "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=85", "PDF"],
];

async function main() {
  await prisma.organizationProfile.upsert({
    where: { id: "main" },
    update: {
      heroTitle: "DPC HPI Kabupaten Bintan",
      history: "DPC HPI Kabupaten Bintan adalah Dewan Pimpinan Cabang Himpunan Pramuwisata Indonesia yang berperan sebagai wadah profesi pramuwisata di Kabupaten Bintan. Kami mengawal profesionalisme, etika pelayanan, peningkatan kompetensi, dan kolaborasi pariwisata daerah.",
      vision: "Menjadi organisasi profesi pramuwisata yang profesional, kompeten, beretika, dan menjadi rujukan utama pelayanan wisata Kabupaten Bintan dan Kepulauan Riau.",
      mission: "Meningkatkan kompetensi anggota melalui pelatihan berkala, membangun jaringan kemitraan, mendukung promosi destinasi, dan memastikan layanan pramuwisata yang aman, informatif, serta berkesan.",
      heroSubtitle: "Dewan Pimpinan Cabang Himpunan Pramuwisata Indonesia Kabupaten Bintan - mengawal profesionalisme dan memajukan pariwisata Kepulauan Riau.",
    },
    create: {
      id: "main",
      heroTitle: "DPC HPI Kabupaten Bintan",
      history: "DPC HPI Kabupaten Bintan adalah Dewan Pimpinan Cabang Himpunan Pramuwisata Indonesia yang berperan sebagai wadah profesi pramuwisata di Kabupaten Bintan. Kami mengawal profesionalisme, etika pelayanan, peningkatan kompetensi, dan kolaborasi pariwisata daerah.",
      vision: "Menjadi organisasi profesi pramuwisata yang profesional, kompeten, beretika, dan menjadi rujukan utama pelayanan wisata Kabupaten Bintan dan Kepulauan Riau.",
      mission: "Meningkatkan kompetensi anggota melalui pelatihan berkala, membangun jaringan kemitraan, mendukung promosi destinasi, dan memastikan layanan pramuwisata yang aman, informatif, serta berkesan.",
      structure: "Ketua, Wakil Ketua, Sekretaris, Bendahara, Koordinator Lapangan, Bidang Pendidikan, Bidang Humas, dan Koordinator Mitra.",
      heroSubtitle: "Dewan Pimpinan Cabang Himpunan Pramuwisata Indonesia Kabupaten Bintan - mengawal profesionalisme dan memajukan pariwisata Kepulauan Riau.",
    },
  });

  await prisma.contact.upsert({ where: { id: contact.id }, update: contact, create: contact });

  const existingMembers = await prisma.member.findMany({ orderBy: { createdAt: "asc" }, take: memberNames.length });
  for (const [index, name] of memberNames.entries()) {
    const data = {
      name,
      position: memberPositions[index] || "Pramuwisata",
      contact: `+62 812-4500-11${String(index + 1).padStart(2, "0")}`,
      photo: memberPhotos[index % memberPhotos.length],
      isActive: true,
    };
    const existingByName = await prisma.member.findFirst({ where: { name } });
    const target = existingByName || existingMembers[index];
    if (target) await prisma.member.update({ where: { id: target.id }, data });
    else await prisma.member.create({ data });
  }

  for (const [title, fileUrl] of galleryItems) {
    const existing = await prisma.gallery.findFirst({ where: { OR: [{ title }, { fileUrl }] } });
    const data = { title, category: "PHOTO", fileUrl, description: "Dokumentasi kegiatan HPI Bintan." };
    if (existing) await prisma.gallery.update({ where: { id: existing.id }, data });
    else await prisma.gallery.create({ data });
  }

  for (const [title, fileUrl, fileType] of documents) {
    const existing = await prisma.documentation.findFirst({ where: { OR: [{ title }, { fileUrl }] } });
    const data = { title, fileUrl, fileType, description: "Dokumen dan dokumentasi organisasi yang dapat diperbarui melalui dashboard admin." };
    if (existing) await prisma.documentation.update({ where: { id: existing.id }, data });
    else await prisma.documentation.create({ data });
  }

  await prisma.settings.upsert({ where: { key: "active_members" }, update: { value: "50+" }, create: { key: "active_members", value: "50+" } });
  console.log("Konten database berhasil disinkronkan: kontak, anggota, galeri rapat, dan dokumen.");
}

main().finally(() => prisma.$disconnect());
