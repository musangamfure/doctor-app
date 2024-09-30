"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import Container from "@/components/frontend/Container";
import Image from "next/image";
import React from "react";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { role, plan } = searchParams;
  return (
    <Container className="bg-blue-100 pt-8 pb-16 min-h-screen dark:bg-black">
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

        <RegisterForm role={role} plan={plan} />
      </div>
    </Container>
  );
}
