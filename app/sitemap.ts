import type { MetadataRoute } from "next";
const routes = ["", "/tentang-kami", "/anggota", "/absensi-harian", "/absensi-rapat", "/galeri", "/dokumentasi", "/transportasi", "/pengumuman", "/kontak"];
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000"; return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })); }
