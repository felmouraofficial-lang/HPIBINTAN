import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,.08)]", className)} {...props} />; }
