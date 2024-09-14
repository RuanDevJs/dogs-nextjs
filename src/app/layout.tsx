import type { Metadata } from "next";
import { Spectral } from "next/font/google";

import { getServerSession } from "next-auth";
import { auth } from "./api/auth/[...nextauth]/route";

import "./globals.css";
import Protected from "@/components/Protected";

const inter = Spectral({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dogs | Criado por @ruandevjs",
  description: "Site criado inteiramente por @ruandevjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionAuth = await getServerSession(auth);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Protected session={sessionAuth}>{children}</Protected>
      </body>
    </html>
  );
}
