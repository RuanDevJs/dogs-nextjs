"use client";

import { At, CaretRight } from "phosphor-react";
import * as Input from "@/components/Form/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../lib/axios";
import { useRouter } from "next/navigation";

const registerFormSchema = z.object({
  name: z.string().min(5, "Por favor digite seu nome completo"),
  username: z
    .string()
    .min(5, "O seu nome de usuário precisa conter no mínimo 5 caracteres")
    .max(9, "O seu nome de usuário não pode ultrapassar 9 caracteres")
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hifens!",
    })
    .transform((username) => username.toLowerCase()),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const router = useRouter();

  async function handleRegister(formData: RegisterFormData) {
    try {
      const response = await api.post("/users", { ...formData });
      await router.push("/register/complete-auth");
    } catch (error) {
      alert("Nome de usuário já cadastrado!");
    }
  }

  return (
    <main className="grid grid-cols-2 h-dvh overflow-hidden">
      <div className="bg-login-background-image bg-login-background-position bg-cover h-full" />
      <form
        className="h-full flex flex-col justify-center px-12 animate-transition-page-down overflow-hidden"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="my-3">
          <h1 className="flex items-center text-5xl font-spectral-700 z-[100] text-spectral-dark relative after:block after:w-6 after:h-6 after:bg-[#FFBB11] after:absolute after:-z-10 after:bottom-0 after:rounded">
            Cadastro
          </h1>
        </div>
        <Input.Root className="mb-2">
          <Input.Label>Nome Completo</Input.Label>
          <Input.Group>
            <input
              className="w-full h-full px-5 outline-none text-lg text-spectral-dark font-medium bg-zinc-50 rounded-r"
              minLength={5}
              placeholder="Nome completo"
              {...register("name")}
            />
          </Input.Group>
          <span className="text-sm py-1 block font-normal text-red-700">
            {formState.errors.name?.message}
          </span>
        </Input.Root>

        <Input.Root>
          <Input.Label>Nome de Usuário</Input.Label>
          <Input.Group>
            <Input.Prefix>
              <At size={18} color="#515151" />
            </Input.Prefix>
            <input
              className="w-full h-full px-5 outline-none text-lg text-spectral-dark font-medium bg-zinc-50 rounded-r"
              minLength={5}
              maxLength={9}
              placeholder="Nome de usuário"
              {...register("username")}
            />
          </Input.Group>
          <span className="text-sm py-1 block font-normal text-red-700">
            {formState.errors.username?.message}
          </span>
        </Input.Root>

        <button
          className="bg-[#FFBB11] w-72 py-3 rounded-md mt-5 flex items-center justify-center gap-3 font-bold text-[#764701] text-md hover:opacity-85 ease-in-out duration-200"
          type="submit"
        >
          Cadastrar Minha Conta
          <CaretRight size={22} color="#764701" weight="bold" />
        </button>
      </form>
    </main>
  );
}
