import Header from "@/components/frontend/Header";
import Navbar from "@/components/frontend/Navbar/Navbar";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
