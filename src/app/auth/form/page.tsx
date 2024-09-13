"use client";

import { useSession } from "next-auth/react";
import {
  ArrowCircleRight,
  Dog,
  PawPrint,
  Plus,
  PlusCircle,
} from "phosphor-react";

export default function Form() {
  const session = useSession();

  return (
    <div className="max-w-[50rem] mt-12 mx-auto  relative">
      <form action="">
        <div className="flex flex-col gap-2 w-2/3">
          <label
            className="font-helvetica font-normal text-base text-zinc-500"
            htmlFor="title"
          >
            Escreva uma legenda
          </label>
          <input
            type="text"
            placeholder="Gostaria de compartilhar..."
            className="font-helvetica font-normal text-sm text-zinc-900 px-3 py-4 border rounded bg-zinc-100 outline-none focus:border-yellow-400 focus:bg-white"
            id="title"
          />
        </div>
        <div className="mt-3 w-2/3">
          <label
            className="font-helvetica font-normal text-base text-zinc-500"
            htmlFor="file"
          >
            Selecione uma foto para postar
            <span className="font-helvetica font-normal text-base text-zinc-400 flex items-center gap-1 py-4 cursor-pointer border px-3 text-center justify-center border-dashed hover:text-[#FFBB11] hover:border-[#FFBB11] rounded transition ease-in-out duration-150 bg-zinc-100 mt-1 hover:bg-yellow-50">
              Escolher minha foto <Dog size={18} weight="regular" />
            </span>
          </label>
          <input type="file" className="hidden" id="file" />
        </div>
        <button
          type="submit"
          className="font-helvetica font-normal text-base text-zinc-50 bg-[#FFBB11] w-2/3 flex justify-center items-center px-4 py-3 mt-5 rounded hover:bg-yellow-400 ease-in-out duration-150 transition gap-2 disabled:bg-zinc-300 disabled:cursor-not-allowed"
          disabled={false}
        >
          Postar minha foto <PawPrint size={20} weight="regular" />
        </button>
      </form>
    </div>
  );
}
