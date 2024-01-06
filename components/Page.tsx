import { ReactNode } from "react";
import Header from "./Header";

type PageProps = {
  children: ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
