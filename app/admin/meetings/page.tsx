import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Kegiatan / Agenda" resource="agendas" fields={[
    { name: "coverImage", label: "Cover Image", type: "file", accept: "image/*" },
    { name: "title", label: "Judul", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "badge", label: "Badge" },
    { name: "shortDescription", label: "Deskripsi Singkat", type: "textarea", required: true },
    { name: "longDescription", label: "Deskripsi Lengkap", type: "textarea", required: true },
    { name: "date", label: "Tanggal", type: "date", required: true },
    { name: "time", label: "Jam" },
    { name: "location", label: "Lokasi" },
    { name: "registrationUrl", label: "Link Pendaftaran" },
    { name: "contactPerson", label: "Narahubung" },
    { name: "isPublished", label: "Publish", type: "checkbox" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ]} /></AdminShell>;
}
