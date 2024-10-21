"use client";

import Link from "next/link";
import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { PracticeInfoProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import ArrayInput from "../auth/forminputs/ArrayInput";
import { SelectInput } from "../auth/forminputs/SelectInput";
import { StepFormProps } from "./BioDataForm";
import toast from "react-hot-toast";
import { updateDoctorPracticeById } from "../../../actions/onboarding";
import { useOnboardingContext } from "../../../context/context";

const insuranceOptions = [
  {
    title: "Yes",
    value: "yes",
  },
  {
    title: "No",
    value: "no",
  },
];

export default function PracticeInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const { practiceData, savedDBData, setPracticeData } = useOnboardingContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialServices =
    practiceData.servicesOffered.length > 0
      ? practiceData.servicesOffered
      : savedDBData?.servicesOffered ?? [];
  const [services, setServices] = useState<string[]>(initialServices);
  const initialLanguages =
    practiceData.languageSpoken.length > 0
      ? practiceData.languageSpoken
      : savedDBData?.languageSpoken ?? [];
  const [languages, setLanguages] = useState<string[]>(initialLanguages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PracticeInfoProps>({
    defaultValues: {
      hospitalName: practiceData.hospitalName || savedDBData.hospitalName,
      hospitalAddress:
        practiceData.hospitalAddress || savedDBData.hospitalAddress,
      hospitalEmailAddress:
        practiceData.hospitalEmailAddress || savedDBData.hospitalEmailAddress,
      hospitalContactNumber:
        practiceData.hospitalContactNumber || savedDBData.hospitalContactNumber,
      hospitalHoursOfOperation:
        practiceData.hospitalHoursOfOperation ||
        savedDBData.hospitalHoursOfOperation,
      hospitalWebsite:
        practiceData.hospitalWebsite || savedDBData.hospitalWebsite,
      insuranceAccepted:
        practiceData.insuranceAccepted || savedDBData.insuranceAccepted,
      page: practiceData.page || savedDBData.page,
    },
  });

  async function onSubmit(data: PracticeInfoProps) {
    setIsLoading(true);
    data.page = page;
    data.servicesOffered = services;
    data.languageSpoken = languages;
    data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation);

    console.log(data);
    try {
      const res = await updateDoctorPracticeById(formId, data);
      setPracticeData(data);
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
            name="hospitalName"
            label="Hospital Name"
            placeholder="Enter Hospital Name"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />

          <TextFormInput
            name="hospitalAddress"
            label="Hospital Address"
            type="email"
            placeholder="Enter Hospital Address"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="hospitalWebsite"
            label="Hospital Website (if any)"
            placeholder="Enter Hospital Website"
            register={register}
            errors={errors}
            isRequired={false}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="hospitalContactNumber"
            label="Hospital Contact Number"
            placeholder="Enter Hospital Contact Number"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="hospitalEmailAddress"
            label="Hospital Email Address"
            placeholder="Enter Hospital Email Address"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="hospitalHoursOfOperation"
            type="number"
            label="Hospital Hours of Operation"
            placeholder="Enter Hospital Hours of Operation"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="hourlWage"
            type="number"
            label="Hourly Wage"
            placeholder="Enter Hourly Wage"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />

          <SelectInput
            register={register}
            options={insuranceOptions}
            name="insuranceAccepted"
            label=" Do you accept insurance?"
            placeholder="Select Your answer"
          />

          <ArrayInput
            title="Add Services offered"
            items={services}
            setItems={setServices}
            placeholder="Enter Services offered"
          />
          <ArrayInput
            title="Add Languages Spoken"
            items={languages}
            setItems={setLanguages}
            placeholder="Enter Languages Spoken"
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
