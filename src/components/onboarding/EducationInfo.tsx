"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { EducationInfoProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SelectInput } from "../auth/forminputs/SelectInput";
import ArrayInput from "../auth/forminputs/ArrayInput";
import MultipleFileInput, { File } from "../auth/forminputs/MultipleFileInput";
import { StepFormProps } from "./BioDataForm";
import toast from "react-hot-toast";
import { updateDoctorEducationById } from "../../../actions/onboarding";
import { useOnboardingContext } from "../../../context/context";

export default function EducationInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
}: StepFormProps) {
  const { educationData, savedDBData, setEducationData } =
    useOnboardingContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialSpecialization =
    educationData.otherSpecialization.length > 0
      ? educationData.otherSpecialization
      : savedDBData?.otherSpecialization ?? [];

  const [otherSpecialization, setOtherSpecialization] = useState<string[]>(
    initialSpecialization
  );
  const initialDocs =
    educationData.boardCertificates || savedDBData.boardCertificates;
  const [docs, setDocs] = useState<File[]>(initialDocs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationInfoProps>({
    defaultValues: {
      medicalSchool: educationData.medicalSchool || savedDBData.medicalSchool,
      graduationYear:
        educationData.graduationYear || savedDBData.graduationYear,
      primarySpecialization:
        educationData.primarySpecialization ||
        savedDBData.primarySpecialization,
      page: educationData.page || savedDBData.page,
    },
  });

  const options = [
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Gastroenterology",
    "General Surgery",
  ];

  async function onSubmit(data: EducationInfoProps) {
    data.page = page;
    data.otherSpecialization = otherSpecialization;
    data.boardCertificates = docs.map((doc: any) => doc.url);
    console.log(data);
    setIsLoading(true);

    try {
      const res = await updateDoctorEducationById(formId, data);
      setEducationData(data);

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
        className=" p-4 dark:bg-black dark:rounded-md dark:border dark:border-white/50"
      >
        <div className="grid grid-cols-2 gap-2">
          <TextFormInput
            name="medicalSchool"
            label="Medical School"
            placeholder="Enter your medical school"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-full"
          />

          <TextFormInput
            name="graduationYear"
            label="Graduation Year"
            placeholder="Enter your graduation year"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />

          <SelectInput
            options={options}
            name="primarySpecialization"
            label="Select your primary specialization"
            placeholder="Select Specialization"
            register={register}
            className="col-span-full sm:col-span-1"
          />

          <ArrayInput
            title="Add More Specializations"
            items={otherSpecialization}
            setItems={setOtherSpecialization}
          />

          <MultipleFileInput
            label="Upload your Academic Documents (/Max 4 Docs)"
            files={docs}
            setFiles={setDocs}
            endpoint="doctorProfessionDocs"
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
