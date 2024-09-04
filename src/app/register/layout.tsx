"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function RegisterLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <SessionProvider>{children}</SessionProvider>;
}
