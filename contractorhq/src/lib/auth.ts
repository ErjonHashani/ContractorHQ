// app/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Server-only auth helper
export function auth() {
  return getServerSession(authOptions);
}
