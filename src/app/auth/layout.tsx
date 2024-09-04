"use client";

import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const session = useSession();

  if (session.status !== "loading" && session.status === "unauthenticated") {
    return redirect("/register?error=unauthenticated");
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
