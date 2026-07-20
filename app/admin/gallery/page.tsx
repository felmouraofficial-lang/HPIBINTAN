import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Galeri" resource="gallery" fields={[
    { name: "title", label: "Judul", required: true },
    { name: "category", label: "Kategori", type: "select", options: ["PHOTO", "VIDEO"] },
    { name: "fileUrl", label: "Upload Foto/Video", type: "file", required: true, accept: "image/*,video/mp4" },
    { name: "thumbnail", label: "Upload Thumbnail", type: "file", accept: "image/*" },
    { name: "caption", label: "Caption" },
    { name: "description", label: "Deskripsi", type: "textarea" },
    { name: "sortOrder", label: "Urutan", type: "number" },
    { name: "isPublished", label: "Publish", type: "checkbox" },
  ]} /></AdminShell>;
}
