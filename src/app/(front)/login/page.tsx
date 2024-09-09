import LoginForm from "@/components/auth/LoginForm";
import Container from "@/components/frontend/Container";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
  return (
    <Container className="bg-blue-100 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-w-4xl mx-auto bg-white border-gray-200 rounded-lg shadow overflow-hidden  dark:bg-gray-800 dark:border-gray-700">
        <div className="hidden md:flex">
          <Image
            src={"/bg-doctor.png"}
            alt="doctor"
            width={1200}
            height={1200}
            className="object-cover"
          />
        </div>
        <div className="">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
