"use client";

import Container from "@/components/frontend/Container";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Container>
        <Footer />
      </Container>
    </div>
  );
}
