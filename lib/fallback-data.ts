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
  address: "Jl. Langsat RT.001 / RW.001, Desa Sebong Lagoi, Kec. Teluk Sebong, Kab. Bintan.",
  email: "info@hpibintan.org",
  whatsapp: "+62 812 7565 7026",
  mapUrl: "https://maps.google.com/?q=Jl.%20Langsat%20Desa%20Sebong%20Lagoi%20Teluk%20Sebong%20Bintan",
};

const fallbackMemberNames = [
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

const fallbackPositions = ["Ketua DPD", "Wakil Ketua", "Sekretaris", "Bendahara", "Koordinator Lapangan", "Koordinator Pelatihan", "Bidang Humas", "Bidang Keanggotaan", "Pramuwisata", "Pramuwisata"];

export const fallbackMembers = fallbackMemberNames.map((name, index) => ({
  id: `fallback-member-${index + 1}`,
  name,
  position: fallbackPositions[index] ?? "Pramuwisata",
  contact: `+62 812-4500-11${String(index + 1).padStart(2, "0")}`,
  photo: ["/member-dummy-1.jpeg", "/member-dummy-2.jpeg", "/member-dummy-3.jpeg", "/uploads/1784221305257-f652719a-d758-47ae-ae59-a9beca92924e.jpg"][index % 4],
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
  ["Kegiatan Rapat Pengurus", "/foto-rapat/rapat-01.jpeg"],
  ["Rapat Koordinasi Anggota", "/foto-rapat/rapat-02.jpeg"],
  ["Dokumentasi Rapat Bulanan", "/foto-rapat/rapat-03.jpeg"],
  ["Suasana Rapat HPI Bintan", "/foto-rapat/rapat-04.jpeg"],
  ["Pelatihan Interpretasi Destinasi", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85"],
  ["Kunjungan Wisata Bintan", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"],
  ["Seminar Hospitality", "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85"],
  ["Kolaborasi Mitra Pariwisata", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"],
].map(([title, fileUrl], index) => ({
  id: `fallback-gallery-${index + 1}`,
  title,
  category: "PHOTO" as const,
  fileUrl,
  description: "Dokumentasi kegiatan HPI Bintan.",
  createdAt: new Date(2026, 0, index + 1),
}));

export const fallbackDocuments = [
  ["Dokumentasi Rapat Pengurus", "/foto-rapat/rapat-05.jpeg", "JPG"],
  ["Album Rapat Anggota", "/foto-rapat/rapat-06.jpeg", "JPG"],
  ["AD/ART HPI Bintan", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85", "PDF"],
  ["Surat Keputusan Kepengurusan", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85", "PDF"],
  ["Program Kerja Tahunan", "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=85", "PDF"],
  ["Laporan Tahunan Organisasi", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85", "PDF"],
].map(
  ([title, fileUrl, fileType], index) => ({
    id: `fallback-document-${index + 1}`,
    title,
    fileUrl,
    fileType,
    description: "Dokumen dan dokumentasi organisasi yang dapat diperbarui melalui dashboard admin.",
    createdAt: new Date(2026, 0, index + 1),
  }),
);

export const fallbackTransportation = [
  ["Toyota Hiace Premio", "Van Premium", 12, "AVAILABLE", "/transport-hiace-premium.jpg"],
  ["Toyota Hiace Commuter", "Van Wisata", 14, "AVAILABLE", "/transport-hiace-standar.jpg"],
  ["Toyota Innova Zenix", "MPV", 6, "AVAILABLE", "/transport-toyota-zenix.jpg"],
  ["Bus Pariwisata", "Bus", 32, "AVAILABLE", "/transport-bus-pariwisata.jpg"],
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
    description: "Pantai pasir putih yang bersih. Cocok untuk berenang, sunset, dan bersantai. Banyak kafe dan restoran di sekitar pantai.",
    location: "Lagoi, Bintan",
    image: "/head-background.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lagoi+Bay+Bintan",
  },
  {
    category: "Wisata Pantai",
    name: "Pantai Trikora",
    description: "Pantai alami dengan ombak tenang. Banyak penginapan dan tempat makan seafood. Cocok untuk snorkeling dan liburan keluarga.",
    location: "Trikora, Bintan Timur",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Trikora+Bintan",
  },
  {
    category: "Wisata Pantai",
    name: "Pantai Sakera",
    description: "Pantai yang lebih sepi dengan pemandangan batu granit dan air laut jernih.",
    location: "Tanjung Uban, Bintan",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pantai+Sakera+Bintan",
  },
  {
    category: "Wisata Alam",
    name: "Treasure Bay Bintan",
    description: "Crystal Lagoon terbesar di Asia Tenggara. Wisatawan bisa bermain kayak, paddle board, ATV, hingga water sport.",
    location: "Lagoi, Bintan",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Treasure+Bay+Bintan",
  },
  {
    category: "Wisata Alam",
    name: "Gurun Pasir Busung",
    description: "Bekas tambang yang berubah menjadi bukit pasir dan menjadi spot foto favorit wisatawan.",
    location: "Busung, Bintan",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gurun+Pasir+Busung+Bintan",
  },
  {
    category: "Wisata Alam",
    name: "Danau Biru Busung",
    description: "Danau berwarna biru yang berada di samping Gurun Pasir. Pemandangannya sangat unik dan fotogenik.",
    location: "Busung, Bintan",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Danau+Biru+Busung+Bintan",
  },
  {
    category: "Wisata Alam",
    name: "Bintan Mangrove",
    description: "Susur sungai menggunakan perahu. Pengunjung bisa melihat monyet, burung, hingga biawak di kawasan mangrove.",
    location: "Sebong Lagoi, Bintan",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bintan+Mangrove",
  },
  {
    category: "Wisata Alam",
    name: "Safari Lagoi & Eco Farm",
    description: "Tempat melihat berbagai satwa dan aktivitas edukasi alam. Cocok untuk liburan keluarga.",
    location: "Lagoi, Bintan",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Safari+Lagoi+Eco+Farm+Bintan",
  },
  {
    category: "Wisata Sejarah & Budaya",
    name: "Pulau Penyengat",
    description: "Masjid Sultan Riau yang terkenal, pusat sejarah Kesultanan Riau-Lingga, dan banyak bangunan peninggalan kerajaan.",
    location: "Tanjungpinang",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pulau+Penyengat",
  },
  {
    category: "Wisata Sejarah & Budaya",
    name: "Vihara Ksitigarbha Bodhisattva",
    description: "Dikenal sebagai Vihara 500 Lohan dengan ratusan patung yang memiliki ekspresi berbeda.",
    location: "Tanjungpinang",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vihara+Ksitigarbha+Bodhisattva+Tanjungpinang",
  },
  {
    category: "Wisata Sejarah & Budaya",
    name: "Museum Sultan Sulaiman Badrul Alamsyah",
    description: "Museum untuk mengenal sejarah dan budaya Melayu melalui koleksi, arsip, dan narasi kota lama.",
    location: "Tanjungpinang",
    image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?auto=format&fit=crop&w=1200&q=85",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Museum+Sultan+Sulaiman+Badrul+Alamsyah",
  },
];

export const fallbackSettings = {
  hero_image: "/head-background.jpg",
  map_image: "/peta-pulau-bintan.jpg",
  map_text:
    "Pulau Bintan berada pada jalur strategis pariwisata Kepulauan Riau. HPI Bintan mendukung layanan interpretasi destinasi untuk wilayah pesisir, kawasan resort, ekowisata, sejarah, dan budaya.",
};

export const fallbackPartners = ["Dinas Pariwisata", "Pelaku Hotel", "Mitra Transportasi", "Komunitas Wisata", "Desa Wisata", "Travel Agent"];
