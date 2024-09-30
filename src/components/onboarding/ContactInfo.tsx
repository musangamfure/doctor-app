"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { ContactInfoProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";

import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import toast from "react-hot-toast";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorContactById } from "../../../actions/onboarding";
import { useOnboardingContext } from "../../../context/context";

export default function ContactInfo({
  page,
  title,
  description,
  formId,
  nextPage,
  userId,
}: StepFormProps) {
  const { contactData, savedDBData, setContactData } = useOnboardingContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInfoProps>({
    defaultValues: {
      email: contactData.email || savedDBData.email,
      phone: contactData.phone || savedDBData.phone,
      country: contactData.country || savedDBData.country,
      page: contactData.page || savedDBData.page,
      city: contactData.city || savedDBData.city,
      state: contactData.state || savedDBData.state,
    },
  });

  async function onSubmit(data: ContactInfoProps) {
    data.page = page;
    console.log(data);
    setIsLoading(true);

    try {
      const res = await updateDoctorContactById(formId, data);
      setContactData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile updated successfully");
        router.push(`/onboarding/${userId}?page=${nextPage}`);
        console.log(res.data);
      } else {
        toast.error("Something went wrong!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  }

  return (
    <div className=" px-4 py-4 w-full mx-auto">
      <CardHeader className="text-center border-b border-slate-300 ">
        <CardTitle className="scroll-m-14 dark:text-slate-950 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </CardTitle>
        <CardDescription className="dark:text-slate-700">
          {description}
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4  dark:bg-black dark:rounded-md dark:border dark:border-white/50"
      >
        <div className="grid grid-cols-2 gap-2">
          <TextFormInput
            name="email"
            label="Email Address"
            placeholder="Eg: doe@gmail.com"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-full"
          />

          <TextFormInput
            name="phone"
            label="Phone Number"
            placeholder="Eg: 0777777777"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="country"
            label="Country"
            placeholder="Enter your country"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="city"
            label="City"
            placeholder="Enter your city"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="state"
            label="State"
            placeholder="Enter your state"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <SubmitButton
            className="mt-6"
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="saving in progress..."
          />
        </div>
      </form>
    </div>
  );
}
