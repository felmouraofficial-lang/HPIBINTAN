# Sistem Informasi HPI Bintan

Website company profile dan dashboard admin DPC HPI Kabupaten Bintan, dibangun dengan Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth, Zod, TanStack Table-ready patterns, Lucide, dan Framer Motion-ready dependency.

## Setup

1. Salin `.env.example` menjadi `.env`.
2. Isi `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD`.
3. Jalankan `npm install`.
4. Jalankan `npm run prisma:migrate`.
5. Jalankan `npm run prisma:seed` untuk membuat satu akun admin dan konten awal.
6. Jalankan `npm run dev`.

## Halaman Publik

- `/`
- `/tentang-kami`
- `/anggota`
- `/absensi-harian`
- `/absensi-rapat`
- `/galeri`
- `/dokumentasi`
- `/transportasi`
- `/pengumuman`
- `/kontak`

## Dashboard Admin

Login di `/admin/login`. Dashboard menggunakan satu akun admin dari seed atau environment variable. Tidak ada registrasi, multi-admin, role, atau member login.

## Upload

Endpoint upload tersedia di `/api/upload` dan menerima JPG, PNG, WEBP, MP4, PDF, DOC, dan DOCX. File disimpan di `public/uploads` dan dapat direferensikan dari form dashboard memakai URL hasil upload.
