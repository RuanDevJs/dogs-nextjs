"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Plus, SignOut, SquaresFour } from "phosphor-react";
import React from "react";

export default function Navigation() {
  const session = useSession();
  const location = useRouter();
  const path = usePathname();

  const currentPage = () => {
    const currentRouteAuthenticated = path.split("/").reverse()[0];
    if (currentRouteAuthenticated === "form") return "Poste Sua Foto";
    return "Minha conta";
  };

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="mt-10">
      <div className="max-w-[50rem] mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold text-spectral-dark relative after:block after:w-6 after:h-6 after:bg-[#FFBB11] after:absolute after:-z-10 after:bottom-0 after:rounded">
            {currentPage()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/account"
            className="p-2 bg-zinc-100 text-zinc-800 rounded  transition ease-in-out duration-150 hover:bg-yellow-200 hover:text-yellow-600"
          >
            <SquaresFour size={25} weight="regular" />
          </Link>
          <Link
            href="/auth/form"
            className="p-2 bg-zinc-100 text-zinc-800 rounded  transition ease-in-out duration-150 hover:bg-yellow-200 hover:text-yellow-600"
          >
            <Plus size={25} weight="regular" />
          </Link>
          <button
            className="p-2 bg-zinc-100 text-zinc-800 rounded hover:text-red-800 transition ease-in-out duration-150 hover:bg-red-400"
            onClick={handleSignOut}
          >
            <SignOut size={25} weight="duotone" />
          </button>
        </div>
      </div>
    </div>
  );
}
