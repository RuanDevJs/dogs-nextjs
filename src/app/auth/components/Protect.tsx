"use client";

import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import Navigation from "../components/Navigation";

export default function Protect() {
  const session = useSession();

  if (session.status !== "loading" && session.status === "unauthenticated") {
    return redirect("/register");
  }

  return (
    <div>
      <Header />
      <Navigation />
    </div>
  );
}
