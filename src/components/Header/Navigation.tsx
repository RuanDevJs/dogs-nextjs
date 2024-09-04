import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <Link href="/login" className="text-base font-normal font-helvetica">
      Login/Cadastro
    </Link>
  );
}
