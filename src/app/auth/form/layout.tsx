import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Dogs | Postar Minha Foto",
  description: "Site criado inteiramente por @ruandevjs",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
