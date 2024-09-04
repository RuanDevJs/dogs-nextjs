import React, { PropsWithChildren } from "react";

export default function Group({ children }: PropsWithChildren) {
  return (
    <div className="w-2/4 h-12 bg-zinc-100 flex items-center rounded focus-within:border-2 focus-within:border-[#ffbb11] focus-within:bg-white focus-within:shadow-active-input transition ease-in-out duration-300">
      {children}
    </div>
  );
}
