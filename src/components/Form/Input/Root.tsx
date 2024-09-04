import React, { ComponentProps, ReactHTMLElement } from "react";

interface IRoot extends ComponentProps<"div"> {}
export default function Root(props: IRoot) {
  return <div className="flex flex-col" {...props} />;
}
