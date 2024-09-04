import React, { ComponentProps } from "react";

interface IProps extends ComponentProps<"label"> {}

export default function Label(props: IProps) {
  return (
    <label className="text-lg font-normal text-zinc-500 py-1" {...props} />
  );
}
