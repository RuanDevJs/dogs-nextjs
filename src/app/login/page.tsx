"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { CaretRight, GoogleLogo } from "phosphor-react";
import { MouseEvent } from "react";

export default function Login() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    return redirect("/");
  }

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await router.push("/register");
  }

  async function handleSignIn() {
    await signIn("google");
  }

  return (
    <main className="grid grid-cols-2 h-dvh gap-5">
      <div className="bg-login-background-image bg-login-background-position bg-cover h-full" />
      <div className="h-full flex flex-col justify-center px-12 animate-transition-page-up">
        <div>
          <h1 className="flex items-center text-5xl font-spectral-700 z-[100] text-spectral-dark relative after:block after:w-6 after:h-6 after:bg-[#FFBB11] after:absolute after:-z-10 after:bottom-0 after:rounded">
            Login
          </h1>
        </div>

        <button
          className="bg-[#FFBB11] w-72 py-3 rounded-md mt-5 flex items-center justify-center gap-3 font-bold text-[#764701] text-md hover:opacity-85 ease-in-out duration-200"
          onClick={handleSignIn}
        >
          Fazer Login com o Google
          <GoogleLogo size={24} color="#764701" weight="bold" />
        </button>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-spectral-dark">Cadastre-se</h2>
          <p className="text-base font-helvetica font-normal py-2 text-zinc-500">
            Ainda não possui conta? Cadastre-se no site.
          </p>
          <button
            onClick={handleClick}
            className="bg-[#FFBB11] px-5 py-3 rounded-md flex items-center justify-center gap-3 font-bold text-[#764701] text-md hover:opacity-85 ease-in-out duration-200"
          >
            Cadastro
          </button>
        </div>
      </div>
    </main>
  );
}
