import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Kegiatan / Agenda" resource="meetings" fields={[
    { name: "title", label: "Judul Kegiatan", required: true },
    { name: "date", label: "Tanggal", type: "date", required: true },
    { name: "time", label: "Jam", required: true },
    { name: "location", label: "Lokasi", required: true },
    { name: "description", label: "Deskripsi Lengkap", type: "textarea" },
  ]} /></AdminShell>;
}
