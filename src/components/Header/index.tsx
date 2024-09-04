"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Dog } from "phosphor-react";

import AuthNavigation from "./AuthNavigation";
import Navigation from "./Navigation";

export function Header() {
  const session = useSession();

  return (
    <header className="px-8 py-5 shadow mb-8">
      <div className="flex items-center justify-between max-w-[50rem] mx-auto">
        <Link
          href="/"
          className="text-[#515151] hover:text-[#FFBB11] cursor-pointer transition ease-in-out duration-200"
        >
          <Dog weight="regular" size={32} />
        </Link>
        <div className="flex items-center text-[#333] hover:text-[#FFBB11] cursor-pointer transition ease-in-out duration-200">
          {session.status === "unauthenticated" && <Navigation />}
          {session.status === "authenticated" && (
            <AuthNavigation user={session.data.user} />
          )}
        </div>
      </div>
    </header>
  );
}
