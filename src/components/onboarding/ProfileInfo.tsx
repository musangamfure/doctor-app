"use client";

import React, { useState } from "react";
import TextFormInput from "../auth/forminputs/TextFormInput";
import { useForm } from "react-hook-form";
import { ProfileInfoProps } from "../../../types/types";
import SubmitButton from "../auth/forminputs/SubmitButton";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import DatePickerInput from "../auth/forminputs/DatPickerInput";
import TextareaInput from "../auth/forminputs/TextAreaInput";
import toast from "react-hot-toast";
import ImageInput from "../auth/forminputs/ImageInput";
import { StepFormProps } from "./BioDataForm";
import { updateDoctorProfileById } from "../../../actions/onboarding";
import { useOnboardingContext } from "../../../context/context";

export default function ProfileForm({
  page,
  title,
  description,
  formId,
  nextPage,
  userId,
}: StepFormProps) {
  const { profileData, savedDBData, setProfileData } = useOnboardingContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialExpiryDob =
    profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry;
  const [expiryDob, setExpiryDob] = useState<Date>(initialExpiryDob);
  const initialProfileImage =
    profileData.profilePicture || savedDBData.profilePicture;

  const [profileImage, setProfileImage] = useState(initialProfileImage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInfoProps>({
    defaultValues: {
      bio: profileData.bio || savedDBData.bio,
      profilePicture: profileData.profilePicture || savedDBData.profilePicture,
      medicalLicense: profileData.medicalLicense || savedDBData.medicalLicense,
      medicalLicenseExpiry:
        profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry,
      yearsOfExperience:
        profileData.yearsOfExperience || savedDBData.yearsOfExperience,
      page: profileData.page || savedDBData.page,
    },
  });

  async function onSubmit(data: ProfileInfoProps) {
    setIsLoading(true);
    data.medicalLicenseExpiry = expiryDob;
    data.profilePicture = profileImage;
    data.yearsOfExperience = Number(data.yearsOfExperience);
    data.page = page;
    console.log(data);
    setIsLoading(true);

    try {
      const res = await updateDoctorProfileById(formId, data);
      setProfileData(data);
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
            name="medicalLicense"
            label="Medical Licence"
            register={register}
            errors={errors}
            placeholder="Enter your medical licence"
            className="col-span-full sm:col-span-full"
          />
          <TextFormInput
            name="yearsOfExperience"
            label="Years of Experience"
            register={register}
            errors={errors}
            placeholder="Enter your years experience"
            className="col-span-full sm:col-span-1"
          />
          <DatePickerInput
            className="col-span-full sm:col-span-1"
            date={expiryDob}
            setDate={setExpiryDob}
            title="Medical Licence Expiration"
          />

          <TextareaInput
            label="Bio"
            name="bio"
            register={register}
            errors={errors}
            placeholder="Enter your medical bio"
          />

          <ImageInput
            label="Professional Image"
            imageUrl={profileImage}
            setImageUrl={setProfileImage}
            endpoint="doctorProfileImage"
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
