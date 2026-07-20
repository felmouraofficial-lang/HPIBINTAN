import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Pengumuman" resource="announcements" fields={[
    { name: "title", label: "Judul", required: true },
    { name: "slug", label: "Slug" },
    { name: "cover", label: "Cover", type: "file", accept: "image/*" },
    { name: "thumbnail", label: "Thumbnail", type: "file", accept: "image/*" },
    { name: "content", label: "Ringkasan", type: "textarea", required: true },
    { name: "fullContent", label: "Isi Lengkap", type: "textarea" },
    { name: "pdfUrl", label: "File PDF", type: "file", accept: "application/pdf" },
    { name: "publishedAt", label: "Tanggal Publish", type: "date" },
    { name: "isPublished", label: "Publish", type: "checkbox" },
  ]} /></AdminShell>;
}
