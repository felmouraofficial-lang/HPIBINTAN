import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Dokumentasi" resource="documents" fields={[
    { name: "title", label: "Judul", required: true },
    { name: "category", label: "Kategori" },
    { name: "fileUrl", label: "Upload File", type: "file", required: true, accept: "application/pdf,.doc,.docx,image/*" },
    { name: "thumbnail", label: "Thumbnail", type: "file", accept: "image/*" },
    { name: "fileType", label: "Tipe File", type: "select", options: ["PDF", "DOC", "IMAGE"] },
    { name: "description", label: "Deskripsi", type: "textarea" },
  ]} /></AdminShell>;
}
