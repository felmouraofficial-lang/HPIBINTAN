import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [Credentials({ name: "Admin", credentials: { email: {}, password: {} }, async authorize(credentials) {
    const email = credentials?.email?.toString();
    const password = credentials?.password?.toString();
    if (!email || !password) return null;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) return null;
    return { id: admin.id, email: admin.email, name: admin.name, image: admin.image };
  } })],
  callbacks: { session({ session, token }) { if (session.user) session.user.id = token.sub ?? ""; return session; } },
};
