import { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import Protect from "./components/Protect";

export const metadata: Metadata = {
  title: "Dogs | Minha Conta",
  description: "Site criado inteiramente por @ruandevjs",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Protect />
      {children}
    </div>
  );
}
