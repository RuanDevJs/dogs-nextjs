"use client";

import { Dog } from "phosphor-react";
import React from "react";

export default function SendDescription() {
  return (
    <form className="max-w-[50rem] mx-auto gap-4 p-1 text-center h-[62dvh] flex flex-col justify-center items-center">
      <input
        className="w-full px-5 py-4 outline-none text-sm text-spectral-dark font-medium bg-zinc-100 rounded font-helvetica"
        minLength={5}
        placeholder="Gostaria de compartilhar..."
      />
      <button className="bg-[#FFBB11] w-72 py-3 rounded-md mt-5 flex items-center justify-center gap-3 font-bold text-[#764701] text-md hover:opacity-85 ease-in-out duration-200 font-helvetica">
        Postar minha foto
        <Dog size={18} color="#764701" />
      </button>
    </form>
  );
}
