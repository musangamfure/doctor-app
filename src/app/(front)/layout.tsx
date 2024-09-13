"use client";

import Container from "@/components/frontend/Container";
import Footer from "@/components/frontend/Footer";
import SiteHeader from "@/components/site-header";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      {children}
      <Container className="dark:bg-black border-t  border-white/85 dark:border-t dark:border-white/10">
        <Footer />
      </Container>
    </div>
  );
}
