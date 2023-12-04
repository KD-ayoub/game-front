import { Fragment } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <div className="flex justify-center bg-[#0B0813]">{children}</div>
    </Fragment>
  );
}