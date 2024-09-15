import { PawPrint } from "phosphor-react";
import React from "react";

export default function Loading() {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-3 py-5 px-8 animate-loading-effect">
      <div className="p-2 rounded-full border-dashed border-[2px]">
        <PawPrint size={50} color="#fff" />
      </div>
      <p className="text-base text-zinc-100">Aguarde mais um pouco...</p>
    </div>
  );
}
