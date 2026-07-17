export const fallbackProfile = {
  id: "main",
  history:
    "DPD HPI Pulau Bintan adalah Dewan Pimpinan Daerah Himpunan Pramuwisata Indonesia yang berperan sebagai wadah profesi pramuwisata di Pulau Bintan. Kami mengawal profesionalisme, etika pelayanan, peningkatan kompetensi, dan kolaborasi pariwisata daerah.",
  vision:
    "Menjadi organisasi profesi pramuwisata yang profesional, kompeten, beretika, dan menjadi rujukan utama pelayanan wisata Pulau Bintan dan Kepulauan Riau.",
  mission:
    "Meningkatkan kompetensi anggota melalui pelatihan berkala, membangun jaringan kemitraan, mendukung promosi destinasi, dan memastikan layanan pramuwisata yang aman, informatif, serta berkesan.",
  structure:
    "Ketua, Wakil Ketua, Sekretaris, Bendahara, Koordinator Lapangan, Bidang Pendidikan, Bidang Humas, dan Koordinator Mitra.",
  heroTitle: "Sistem Informasi HPI Bintan",
  heroSubtitle:
    "Dewan Pimpinan Daerah Himpunan Pramuwisata Indonesia Pulau Bintan - mengawal profesionalisme dan memajukan pariwisata Kepulauan Riau.",
};

export const fallbackContact = {
  id: "main",
  address: "Kabupaten Bintan, Kepulauan Riau, Indonesia",
  email: "info@hpibintan.org",
  whatsapp: "+62 812-0000-0000",
  mapUrl: "https://maps.google.com/?q=Bintan",
};

export const fallbackMembers = [
  ["Ardiansyah Putra", "Ketua DPD"],
  ["Maya Sari", "Wakil Ketua"],
  ["Rizal Maulana", "Sekretaris"],
  ["Dewi Lestari", "Bendahara"],
  ["Fahmi Ramadhan", "Koordinator Lapangan"],
  ["Nadia Prameswari", "Koordinator Pelatihan"],
  ["Bima Saputra", "Pramuwisata"],
  ["Siti Nurhaliza", "Pramuwisata"],
].map(([name, position], index) => ({
  id: `fallback-member-${index + 1}`,
  name,
  position,
  contact: `+62 812-4500-11${String(index + 1).padStart(2, "0")}`,
  photo: ["/logos/hpi-logo-1.jpeg", "/logos/hpi-logo-2.jpeg", "/logos/hpi-logo-3.jpeg", "/logos/bintan-tour-guide.png"][index % 4],
  isActive: true,
  createdAt: new Date(2026, 0, index + 1),
}));

export const fallbackAnnouncements = [
  {
    id: "fallback-announcement-1",
    title: "Pelatihan Guide Nasional 2026",
    content:
      "HPI Bintan membuka pendaftaran pelatihan peningkatan kompetensi pramuwisata untuk standar pelayanan destinasi internasional.",
    publishedAt: new Date("2026-07-16T09:00:00+07:00"),
    isPublished: true,
  },
  {
    id: "fallback-announcement-2",
    title: "Rapat Bulanan Pengurus dan Anggota",
    content: "Rapat koordinasi bulanan membahas agenda kegiatan, pelayanan wisata, dan program kerja lintas bidang.",
    publishedAt: new Date("2026-07-15T09:00:00+07:00"),
    isPublished: true,
  },
  {
    id: "fallback-announcement-3",
    title: "Workshop Pariwisata Berkelanjutan",
    content:
      "Kegiatan kolaboratif bersama mitra destinasi untuk memperkuat narasi wisata alam, budaya, dan hospitality Bintan.",
    publishedAt: new Date("2026-07-14T09:00:00+07:00"),
    isPublished: true,
  },
];

export const fallbackGallery = [
  ["Pelatihan Interpretasi Destinasi", "/hero-bintan.jpg"],
  ["Kunjungan Wisata Bintan", "/peta-pulau-bintan.jpg"],
  ["Rapat Koordinasi Bulanan", "/logos/bintan-tour-guide.png"],
  ["Seminar Hospitality", "/logos/hpi-logo-1.jpeg"],
].map(([title, fileUrl], index) => ({
  id: `fallback-gallery-${index + 1}`,
  title,
  category: "PHOTO" as const,
  fileUrl,
  description: "Dokumentasi kegiatan HPI Bintan.",
  createdAt: new Date(2026, 0, index + 1),
}));

export const fallbackDocuments = ["AD/ART HPI Bintan", "Surat Keputusan Kepengurusan", "Program Kerja Tahunan", "Laporan Tahunan Organisasi"].map(
  (title, index) => ({
    id: `fallback-document-${index + 1}`,
    title,
    fileUrl: "/uploads/.gitkeep",
    fileType: "PDF",
    description: "Dokumen organisasi yang dapat diperbarui melalui dashboard admin.",
    createdAt: new Date(2026, 0, index + 1),
  }),
);

export const fallbackTransportation = [
  ["Toyota Hiace Premio", "Van Premium", 12, "AVAILABLE", "/logos/bintan-tour-guide.png"],
  ["Toyota Hiace Commuter", "Van Wisata", 14, "AVAILABLE", "/logos/hpi-logo-2.jpeg"],
  ["Toyota Innova Zenix", "MPV", 6, "AVAILABLE", "/logos/hpi-logo-3.jpeg"],
  ["Bus Pariwisata", "Bus", 32, "AVAILABLE", "/hero-bintan.jpg"],
].map(([name, vehicleType, capacity, status, photo], index) => ({
  id: `fallback-transport-${index + 1}`,
  name: String(name),
  vehicleType: String(vehicleType),
  capacity: Number(capacity),
  status: status as "AVAILABLE" | "UNAVAILABLE",
  photo: String(photo),
  description: "Unit layanan transportasi mitra untuk kebutuhan perjalanan wisata dan kegiatan organisasi.",
  createdAt: new Date(2026, 0, index + 1),
}));

export const fallbackMeetings = [
  {
    id: "fallback-meeting-1",
    title: "Agenda Sertifikasi Kompetensi",
    date: new Date("2026-08-12T09:00:00+07:00"),
    time: "09.00 WIB",
    location: "Bintan Tourism Center",
    description: "Koordinasi persiapan sertifikasi dan kurasi peserta.",
  },
  {
    id: "fallback-meeting-2",
    title: "Forum Mitra Pariwisata",
    date: new Date("2026-08-24T14:00:00+07:00"),
    time: "14.00 WIB",
    location: "Lagoi Bay",
    description: "Pertemuan dengan mitra transportasi, hotel, dan destinasi.",
  },
  {
    id: "fallback-meeting-3",
    title: "Rapat Program Kerja Triwulan",
    date: new Date("2026-09-05T10:00:00+07:00"),
    time: "10.00 WIB",
    location: "Sekretariat HPI Bintan",
    description: "Evaluasi program dan penyusunan agenda lanjutan.",
  },
];

export const fallbackDestinations = [
  {
    category: "Wisata Pantai",
    name: "Lagoi Bay",
    description: "Kawasan pantai premium dengan promenade, resort, dan aktivitas keluarga.",
    location: "Lagoi, Bintan",
    image: "/hero-bintan.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lagoi+Bay+Bintan",
  },
  {
    category: "Wisata Pantai",
    name: "Pantai Trikora",
    description: "Pantai ikonik dengan bebatuan granit dan suasana pesisir yang alami.",
    location: "Trikora, Bintan Timur",
    image: "/peta-pulau-bintan.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Trikora+Bintan",
  },
  {
    category: "Wisata Alam",
    name: "Gurun Pasir Busung",
    description: "Bentang pasir eksotis bekas tambang yang menjadi spot foto favorit wisatawan.",
    location: "Busung",
    image: "/hero-bintan.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gurun+Pasir+Busung+Bintan",
  },
  {
    category: "Wisata Sejarah & Budaya",
    name: "Pulau Penyengat",
    description: "Pulau bersejarah pusat warisan Melayu, religi, dan literasi kawasan Riau.",
    location: "Tanjungpinang",
    image: "/peta-pulau-bintan.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pulau+Penyengat",
  },
];

export const fallbackSettings = {
  hero_image: "/hero-bintan.jpg",
  map_image: "/peta-pulau-bintan.jpg",
  map_text:
    "Pulau Bintan berada pada jalur strategis pariwisata Kepulauan Riau. HPI Bintan mendukung layanan interpretasi destinasi untuk wilayah pesisir, kawasan resort, ekowisata, sejarah, dan budaya.",
};

export const fallbackPartners = ["Dinas Pariwisata", "Pelaku Hotel", "Mitra Transportasi", "Komunitas Wisata", "Desa Wisata", "Travel Agent"];
