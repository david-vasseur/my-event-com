// components/ClientSessionProvider.tsx

"use client"; // Indique que ce composant est un Client Component

import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

