import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Media Manager" resource="media" fields={[
    { name: "url", label: "File", type: "file", required: true, accept: "image/*,video/mp4,application/pdf,.doc,.docx" },
    { name: "filename", label: "Nama File" },
    { name: "mimeType", label: "Mime Type" },
    { name: "size", label: "Ukuran", type: "number" },
    { name: "alt", label: "Alt Text" },
    { name: "folder", label: "Folder" },
  ]} /></AdminShell>;
}
