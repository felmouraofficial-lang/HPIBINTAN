import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Transportasi" resource="transportation" fields={[
    { name: "name", label: "Nama", required: true },
    { name: "category", label: "Kategori" },
    { name: "vehicleType", label: "Jenis", required: true },
    { name: "capacity", label: "Kapasitas", type: "number", required: true },
    { name: "photo", label: "Foto", type: "file", accept: "image/*" },
    { name: "description", label: "Deskripsi", type: "textarea" },
    { name: "contact", label: "Kontak" },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "price", label: "Harga" },
    { name: "status", label: "Status", type: "select", options: ["AVAILABLE", "UNAVAILABLE"] },
    { name: "isPublished", label: "Publish", type: "checkbox" },
  ]} /></AdminShell>;
}
