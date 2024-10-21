"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { BioDataFormProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import DatePickerInput from "../auth/forminputs/DatPickerInput";
import { RadioGroupInput } from "../auth/forminputs/RadioGroupInput";
import toast from "react-hot-toast";
import { generateTrackingNumber } from "@/lib/generateTracking";
import {
  createDoctorProfile,
  updateDoctorProfile,
} from "../../../actions/onboarding";
import { useOnboardingContext } from "../../../context/context";
import { Specialty } from "@prisma/client";

export type StepFormProps = {
  title: string;
  page: string;
  description: string;
  nextPage?: string;
  formId?: string;
  userId?: string;
  specialties?: Specialty[];
};

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export default function BioDataForm({
  page,
  title,
  nextPage,
  description,
  userId,
  formId,
}: StepFormProps) {
  const {
    trackingNumber,
    setTrackingNumber,
    doctorProfileId,
    setDoctorProfileId,
    savedDBData,
    bioData,
    setBioData,
  } = useOnboardingContext();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialDob = bioData.dob || savedDBData.dob;
  const [dob, setDob] = useState<Date>(initialDob);

  console.log(trackingNumber, doctorProfileId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BioDataFormProps>({
    defaultValues: {
      firstName: bioData.firstName || savedDBData.firstName,
      lastName: bioData.lastName || savedDBData.lastName,
      middleName: bioData.middleName || savedDBData.middleName,
      dob: bioData.dob || savedDBData.dob,
      gender: bioData.gender || savedDBData.gender,
      page: bioData.page || savedDBData.page,
      trackingNumber: bioData.trackingNumber || savedDBData.trackingNumber,
    },
  });

  async function onSubmit(data: BioDataFormProps) {
    setIsLoading(true);
    if (!data.gender) {
      toast.error("Please select your gender");
      return;
    }

    data.dob = dob;
    data.trackingNumber = generateTrackingNumber();
    data.userId = userId ?? "";
    data.page = page;
    console.log("sotthing is not working");
    console.log(data);

    try {
      if (formId) {
        const res = await updateDoctorProfile(formId, data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success(" BioData updated successfully");
          setTrackingNumber(res.data?.trackingNumber ?? "");
          setDoctorProfileId(res.data?.id ?? "");

          if (userId && nextPage) {
            router.push(`/onboarding/${userId}?page=${nextPage}`);
          }
        }
      } else {
        const res = await createDoctorProfile(data);
        setBioData(data);
        if (res?.status === 201) {
          setIsLoading(false);
          toast.success("Profile created successfully");
          setTrackingNumber(res.data?.trackingNumber ?? "");
          setDoctorProfileId(res.data?.id ?? "");

          if (userId && nextPage) {
            router.push(`/onboarding/${userId}?page=${nextPage}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className=" px-4 w-full mx-auto">
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
            name="firstName"
            label="First Name"
            placeholder="Eg: John"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />

          <TextFormInput
            name="lastName"
            label="Last Name"
            placeholder="Eg: Doe"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
          <TextFormInput
            name="middleName"
            label="Middle Name (Optional)"
            isRequired={false}
            placeholder="Eg: Doe"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />

          <DatePickerInput
            className="col-span-full sm:col-span-1"
            date={dob}
            setDate={setDob}
            title="Date of Birth"
          />

          <RadioGroupInput
            errors={errors}
            title="Gender"
            radioOptions={genderOptions}
            name="gender"
            register={register}
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
