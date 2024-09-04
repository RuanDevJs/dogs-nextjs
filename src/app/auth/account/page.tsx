"use client";

import { useSession, signOut } from "next-auth/react";
import { Plus, SignOut, SquaresFour } from "phosphor-react";
import React from "react";

export default function Account() {
  const session = useSession();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="mt-10">
      <div className="max-w-[50rem] mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold text-spectral-dark">Minha Conta</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-zinc-100 text-zinc-800 rounded  transition ease-in-out duration-150 hover:bg-yellow-200 hover:text-yellow-600">
            <SquaresFour size={25} weight="regular" />
          </button>
          <button className="p-2 bg-zinc-100 text-zinc-800 rounded  transition ease-in-out duration-150 hover:bg-yellow-200 hover:text-yellow-600">
            <Plus size={25} weight="regular" />
          </button>
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
