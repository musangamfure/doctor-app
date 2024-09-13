"use client";

import Link from "next/link";
import React, { useState } from "react";
import TextFormInput from "./forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "../../../types/types";
import SubmitButton from "./forminputs/SubmitButton";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setIsLoading(false);
        toast.error("Sign-in error: Check your credentials");
        setShowNotification(true);
      } else {
        // Sign-in was successful
        setShowNotification(false);
        reset();
        setIsLoading(false);
        toast.success("Login Successful");
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }
  return (
    <div className="w-full max-w-sm p-4  bg-white sm:p-6 md:p-8 dark:bg-black dark:text-white ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
        {showNotification && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Wrong Token!</span> Please Check the
            token and Enter again
          </Alert>
        )}
        <h5 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Login
        </h5>
        <TextFormInput
          name="email"
          label="Email"
          register={register}
          errors={errors}
          type="email"
        />

        <TextFormInput
          name="password"
          label="Password"
          register={register}
          errors={errors}
          type="password"
        />

        <div className="flex items-start">
          <a
            href="#"
            className="ms-auto text-sm text-blue-700 hover:underline  dark:text-gray-300"
          >
            Lost Password?
          </a>
        </div>
        <SubmitButton
          isLoading={isLoading}
          title="Login to your account"
          loadingTitle="Logging in..."
        />
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <Link
            href="/register"
            className="text-blue-700 hover:underline dark:text-white ml-1 dark:font-semibold"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}
