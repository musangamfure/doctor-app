import LoginForm from "@/components/auth/LoginForm";
import Container from "@/components/frontend/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (session) {
    redirect("/dashboard");
  }
  return (
    <Container className="bg-blue-100 py-8 min-h-screen dark:bg-black">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-w-4xl mx-auto bg-white border-gray-200 rounded-lg shadow overflow-hidden  dark:bg-black dark:border dark:border-white/50">
        <div className="hidden md:flex">
          <Image
            src={"/bg-doctor.png"}
            alt="doctor"
            width={1200}
            height={1200}
            className="object-cover"
          />
        </div>
        <LoginForm />
      </div>
    </Container>
  );
}
