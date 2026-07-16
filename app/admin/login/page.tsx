import Image from "next/image";
import { logos } from "@/lib/utils";

export default function LoginPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f7f4] p-4">
    <form action="/api/admin/login" method="post" className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-7 shadow-soft">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-zinc-950 p-3">
        <Image src={logos[0]} alt="Logo HPI" width={74} height={74} className="rounded-lg bg-white object-contain p-1" />
      </div>
      <p className="mt-6 text-center text-xs font-black uppercase tracking-[.22em] text-primary">Dashboard Admin</p>
      <h1 className="mt-2 text-center text-3xl font-black">HPI Bintan CMS</h1>
      <div className="mt-7 grid gap-3">
        <input name="email" type="email" placeholder="Email admin" defaultValue="admin@hpibintan.org" required className="h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-primary" />
        <input name="password" type="password" placeholder="Password" required className="h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-primary" />
        <button type="submit" className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(215,25,32,.24)] transition hover:-translate-y-0.5 hover:bg-red-700">Masuk Dashboard</button>
      </div>
      <p className="mt-5 text-center text-xs text-zinc-500">Default password: AdminHPI2026!</p>
    </form>
  </main>;
}