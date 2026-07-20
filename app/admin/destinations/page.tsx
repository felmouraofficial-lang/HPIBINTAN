import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Destinasi" resource="destinations" fields={[
    { name: "name", label: "Nama", required: true },
    { name: "slug", label: "Slug", required: true },
    { name: "category", label: "Kategori", required: true },
    { name: "location", label: "Lokasi", required: true },
    { name: "thumbnail", label: "Thumbnail", type: "file", accept: "image/*" },
    { name: "gallery", label: "Gallery", type: "multifile", accept: "image/*" },
    { name: "latitude", label: "Latitude", type: "number" },
    { name: "longitude", label: "Longitude", type: "number" },
    { name: "googleMapsUrl", label: "Link Google Maps" },
    { name: "shortDescription", label: "Deskripsi Singkat", type: "textarea", required: true },
    { name: "longDescription", label: "Deskripsi Lengkap", type: "textarea", required: true },
    { name: "facilities", label: "Fasilitas", type: "textarea" },
    { name: "openingHours", label: "Jam Operasional" },
    { name: "ticketPrice", label: "Harga Tiket" },
    { name: "contact", label: "Kontak" },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "isPublished", label: "Publish", type: "checkbox" },
  ]} /></AdminShell>;
}
