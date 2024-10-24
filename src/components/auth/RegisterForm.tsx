"use client";

import Link from "next/link";
import React, { useState } from "react";
import TextFormInput from "./forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { RegisterInputProps } from "../../../types/types";
import SubmitButton from "./forminputs/SubmitButton";
import { createUser } from "../../../actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm({
  role = "USER",
  plan,
}: {
  role?: string | string[] | undefined;
  plan?: string | string[] | undefined;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();

  async function onSubmit(data: RegisterInputProps) {
    data.role = role;
    data.plan = plan;
    setIsLoading(true);
    try {
      const user = await createUser(data);
      if (user && user.status === 200) {
        reset();
        setIsLoading(false);
        toast.success("User created successfully");
        router.push("/verify-account/" + user.data?.id);
        console.log(user.data);
      } else if (user) {
        toast.error(user.error);
        setIsLoading(false);
      } else {
        toast.error("An error occurred while creating the user");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred while creating the user");
    }
  }

  return (
    <div className="w-full max-w-sm p-4  bg-white sm:p-6 md:p-8 dark:bg-black dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h5 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Sign Up
        </h5>
        <TextFormInput
          name="fullName"
          label="Full Name"
          register={register}
          errors={errors}
        />

        <TextFormInput
          name="email"
          label="Email"
          register={register}
          errors={errors}
          type="email"
        />
        <TextFormInput
          name="phone"
          label="Phone Number"
          register={register}
          errors={errors}
          type="tel"
        />

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white/30 focus:border-white/25 block w-full p-2.5 dark:bg-black dark:border-white/15 dark:placeholder-white/20 dark:text-white"
          />
          {errors.password && (
            <span className="text-xs text-red-600 dark:text-red-400">
              Password is required!
            </span>
          )}
        </div>

        <SubmitButton
          title="Register an account"
          isLoading={isLoading}
          loadingTitle="Creating account..."
        />
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-700 hover:underline dark:white/85 dark:text-white ml-1"
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
