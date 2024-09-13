import Container from "@/components/frontend/Container";
import Footer from "@/components/frontend/Footer";
import SiteHeader from "@/components/site-header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <SiteHeader session={session} />
      {children}
      <Container className="dark:bg-black border-t  border-white/85 dark:border-t dark:border-white/10">
        <Footer />
      </Container>
    </div>
  );
}
