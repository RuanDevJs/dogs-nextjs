import React, { ComponentProps, PropsWithChildren } from "react";

interface IProps extends ComponentProps<"input"> {}

export default function Control({ prefix, children, ...props }: IProps) {
  return (
    <input
      className="w-full h-full px-5 outline-none text-lg text-spectral-dark font-medium bg-zinc-50 rounded-r"
      {...props}
    />
  );
}
