"use client";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
  session: Session | null;
}

export default function Protected({ children, session }: IProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
