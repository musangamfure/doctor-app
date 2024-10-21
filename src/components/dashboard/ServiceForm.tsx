"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { CardHeader, CardTitle } from "../ui/card";
import ImageInput from "../auth/forminputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import createSlug from "../../../utils/slugFunction";
import { ServicesProps } from "../../../types/types";
import { createService, updateService } from "../../../actions/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";

export default function ServiceForm({
  title,
  initialData,
}: {
  title: string;
  initialData?: Service;
}) {
  const router = useRouter();
  const initialImageUrl = initialData?.imageUrl || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServicesProps>({
    defaultValues: {
      title: initialData?.title,
    },
  });

  async function onSubmit(data: ServicesProps) {
    setIsLoading(true);
    const slug = createSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);

    if (initialData?.id) {
      await updateService(initialData.id, data);
      toast.success("Service updated successfully");
      setIsLoading(false);
    } else {
      await createService(data);
      toast.success("Service created successfully");
      setIsLoading(false);
    }
    reset();
    router.push("/dashboard/services");
  }

  // async function handleCreateManyServices() {
  //   setIsLoading(true);
  //   try {
  //     await createManyService();
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
          <Button type="button" asChild variant={"outline"}>
            <Link href={"/dashboard/services"}>
              <X className="w-4 h-4 text-slate-500" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4 dark:bg-black dark:rounded-md dark:border dark:border-white/50"
      >
        <div className="grid grid-cols-2 gap-2">
          <TextFormInput
            name="title"
            label="Service Title"
            register={register}
            errors={errors}
            placeholder="Enter your service title"
            className="col-span-full sm:col-span-full"
          />

          <ImageInput
            label="Service Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="serviceImage"
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button asChild variant={"outline"}>
            <Link href={"/dashboard/services"}>Cancel</Link>
          </Button>
          {/* <Button
            type="button"
            onClick={handleCreateManyServices}
            disabled={isLoading}
            variant={"outline"}
          >
            {isLoading ? "Creating..." : "Create Many"}
          </Button> */}
          <SubmitButton
            className="mt-6"
            title={initialData?.id ? "Update Service" : "Create Service"}
            isLoading={isLoading}
            loadingTitle={
              initialData?.id ? "Updating Service..." : "Creating Service..."
            }
          />
        </div>
      </form>
    </div>
  );
}
