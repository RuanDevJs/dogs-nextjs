"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "phosphor-react";

export default function CompleteAuth() {
  const session = useSession();
  const router = useRouter();

  async function handleClick() {
    try {
      await signIn("google");
    } catch (error) {
      alert("Usuário já existe");
    }
  }

  return (
    <main className="grid grid-cols-2 h-dvh gap-5">
      <div className="bg-register-complete-auth-image bg-login-background-position bg-cover h-full" />
      <div className="h-full flex flex-col justify-center px-12 animate-transition-page-up">
        <div className="my-3">
          <h1 className="flex items-center text-5xl font-spectral-700 z-[100] text-spectral-dark relative after:block after:w-6 after:h-6 after:bg-[#FFBB11] after:absolute after:-z-10 after:bottom-0 after:rounded">
            Completar Cadastro
          </h1>
          <p className="text-base font-normal text-zinc-700 py-2">
            Complete seu cadastro na plataforma através da Google. <br />
            Todos os seus dados estarão mais protegidos.
          </p>
        </div>

        <button
          className="bg-[#DF9A00] w-80 py-3 rounded-md mt-5 flex items-center justify-center gap-3 font-bold text-[#fff] text-md hover:opacity-85 ease-in-out duration-200 disabled:opacity-80 disabled:bg-orange-300 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={session.status === "authenticated" ? true : false}
        >
          Completar Cadastro com Google
          <GoogleLogo size={22} color="#fff" weight="bold" />
        </button>
      </div>
    </main>
  );
}
