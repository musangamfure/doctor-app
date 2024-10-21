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
import { SymptomsProps } from "../../../types/types";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  createManySymptoms,
  createSymptom,
  updateSymptom,
} from "../../../actions/symptoms";
import { Symptom } from "@prisma/client";

export default function SymptomForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Symptom;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SymptomsProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  async function onSubmit(data: SymptomsProps) {
    setIsLoading(true);
    const slug = createSlug(data.title);
    data.slug = slug;
    console.log(data);

    if (initialData?.id) {
      await updateSymptom(initialData?.id, data);
      toast.success("Symptom updated successfully");
      setIsLoading(false);
    } else {
      await createSymptom(data);
      toast.success("Symptom created successfully");
      setIsLoading(false);
    }
    reset();
    router.push("/dashboard/symptoms");
  }

  // async function handleCreateManySymptoms() {
  //   setIsLoading(true);
  //   try {
  //     await createManySymptoms();
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="w-[90%] mx-auto rounded-md shadow-md border border-gray-200 m-3 ">
      <CardHeader className=" border-b border-slate-300 ">
        <div className="flex items-center justify-between">
          <CardTitle className="scroll-m-14 dark:text-white/90 text-2xl font-extrabold tracking-tight lg:text-2xl">
            {title}
          </CardTitle>
          <Button asChild variant={"outline"}>
            <Link href={"/dashboard/symptoms"}>
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
            label="Symptom Title"
            register={register}
            errors={errors}
            placeholder="Enter your symptom title"
            className="col-span-full sm:col-span-full"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button asChild variant={"outline"}>
            <Link href={"/dashboard/symptoms"}>Cancel</Link>
          </Button>
          {/* <Button
            onClick={handleCreateManySymptoms}
            disabled={isLoading}
            variant={"outline"}
          >
            {isLoading ? "Creating..." : "Create Many"}
          </Button> */}
          <SubmitButton
            className="mt-6"
            title={initialData?.id ? "Update Symptom" : "Create Symptom"}
            isLoading={isLoading}
            loadingTitle={initialData?.id ? "Updating..." : "Creating..."}
          />
        </div>
      </form>
    </div>
  );
}
