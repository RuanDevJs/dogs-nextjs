import { PropsWithChildren } from "react";

export default function Prefix({ children }: PropsWithChildren) {
  return <label className="p-2.5">{children}</label>;
}
