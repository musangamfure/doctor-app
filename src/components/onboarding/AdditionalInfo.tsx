"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AdditionInfoProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import TextAreaInput from "../auth/forminputs/TextAreaInput";
import MultipleFileInput, { File } from "../auth/forminputs/MultipleFileInput";
import { StepFormProps } from "./BioDataForm";
import toast from "react-hot-toast";
import { useOnboardingContext } from "../../../context/context";
import { completeDoctorProfile } from "../../../actions/onboarding";

export default function AdditionalInfo({
  page,
  title,
  description,
  formId,
  nextPage,
  userId,
}: StepFormProps) {
  const { additionData, savedDBData, setAdditionData } = useOnboardingContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialAddtionDocss =
    additionData.additionDocs || savedDBData.additionDocs;
  const [additionalDocs, setAdditionalDocs] =
    useState<File[]>(initialAddtionDocss);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdditionInfoProps>({
    defaultValues: {
      educationHistory:
        additionData.educationHistory || savedDBData.educationHistory,
      research: additionData.research || savedDBData.research,
      accomplishments:
        additionData.accomplishments || savedDBData.accomplishments,
      page: additionData.page || savedDBData.page,
    },
  });

  async function onSubmit(data: AdditionInfoProps) {
    setIsLoading(true);
    data.page = page;
    data.additionDocs = additionalDocs.map((doc: any) => doc.url);

    try {
      const res = await completeDoctorProfile(formId, data);
      setAdditionData(data);

      if (res?.status === 201) {
        setIsLoading(false);
        toast.success("Profile updated successfully");
        router.push("/login");
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
          <TextAreaInput
            name="educationHistory"
            label="Education History"
            placeholder="Enter your education history"
            register={register}
            errors={errors}
          />
          <TextAreaInput
            name="research"
            label="Publihed works or Research"
            placeholder="Enter your publications or research"
            register={register}
            errors={errors}
          />
          <TextAreaInput
            name="accomplishments"
            label="Any accomplishments or Awards"
            placeholder="Enter your accomplishments or awards"
            register={register}
            errors={errors}
          />

          <MultipleFileInput
            label="Upload Any Additional Documents (CV, Medical certifications, etc.)"
            files={additionalDocs}
            setFiles={setAdditionalDocs}
            endpoint="doctorAddionalDocs"
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <SubmitButton
            className="mt-6"
            title="Complete"
            isLoading={isLoading}
            loadingTitle="saving in progress..."
          />
        </div>
      </form>
    </div>
  );
}
