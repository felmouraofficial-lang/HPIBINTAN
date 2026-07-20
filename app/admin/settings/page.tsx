import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Website Settings" resource="websiteSettings" fields={[
    { name: "websiteName", label: "Nama Website", required: true },
    { name: "logo", label: "Logo", type: "file", accept: "image/*" },
    { name: "favicon", label: "Favicon", type: "file", accept: "image/*" },
    { name: "address", label: "Alamat", type: "textarea", required: true },
    { name: "email", label: "Email" },
    { name: "phone", label: "Telepon" },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "socials", label: "Sosial Media", type: "textarea" },
    { name: "footer", label: "Footer", type: "textarea" },
    { name: "copyright", label: "Copyright" },
  ]} /></AdminShell>;
}
