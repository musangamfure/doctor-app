"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { CardHeader, CardTitle } from "../ui/card";

import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import createSlug from "../../../utils/slugFunction";
import { ServicesProps, SpecialtyProps } from "../../../types/types";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createSpecialty, updateSpecialty } from "../../../actions/specialties";
import { Specialty } from "@prisma/client";

export default function SpecialtyForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Specialty;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServicesProps>({ defaultValues: { title: initialData?.title } });

  async function onSubmit(data: SpecialtyProps) {
    setIsLoading(true);
    const slug = createSlug(data.title);
    data.slug = slug;
    console.log(data);
    if (initialData?.id) {
      await updateSpecialty(initialData?.id, data);
      toast.success("Specialty updated successfully");
      setIsLoading(false);
    } else {
      await createSpecialty(data);
      toast.success("Specialty created successfully");
      setIsLoading(false);
    }
    reset();
    router.push("/dashboard/specialties");
  }

  // async function handleCreateManySpecialties() {
  //   setIsLoading(true);
  //   try {
  //     await createManySpecialties();
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="w-[90%] mx-auto rounded-md shadow-md border border-gray-200 m-3 ">
      <CardHeader className=" border-b border-slate-300 ">
        <div className="flex items-center justify-between">
          <CardTitle className="scroll-m-14 dark:text-slate-950 text-2xl font-extrabold tracking-tight lg:text-2xl">
            {title}
          </CardTitle>
          <Button asChild variant={"outline"}>
            <Link href={"/dashboard/specialties"}>
              <X className="w-4 h-4 text-slate-500" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4  dark:bg-black dark:rounded-md dark:border dark:border-white/50"
      >
        <div className="grid grid-cols-2 gap-2">
          <TextFormInput
            name="title"
            label="Specialty Title"
            register={register}
            errors={errors}
            placeholder="Enter your specialty title"
            className="col-span-full sm:col-span-full"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button asChild variant={"outline"}>
            <Link href={"/dashboard/specialties"}>Cancel</Link>
          </Button>
          {/* <Button
            onClick={handleCreateManySpecialties}
            disabled={isLoading}
            variant={"outline"}
          >
            {isLoading ? "Creating..." : "Create Many"}
          </Button> */}
          <SubmitButton
            className="mt-6"
            title={initialData?.slug ? "Update Specialty" : "Create Specialty"}
            isLoading={isLoading}
            loadingTitle={
              initialData?.slug
                ? "Updating Specialty..."
                : "Creating Specialty..."
            }
          />
        </div>
      </form>
    </div>
  );
}
