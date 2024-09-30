"use server";

import { prismaClient } from "@/lib/db";
import {
  BioDataFormProps,
  ContactInfoProps,
  EducationInfoProps,
  ProfileInfoProps,
  PracticeInfoProps,
  AdditionInfoProps,
} from "../types/types";

import { Resend } from "resend";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

export async function createDoctorProfile(formData: BioDataFormProps) {
  const {
    dob,
    gender,
    firstName,
    lastName,
    middleName,
    page,
    trackingNumber,
    userId,
  } = formData;

  try {
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob,
        gender,
        firstName,
        lastName,
        middleName,
        page,
        trackingNumber,
        userId,
      },
    });
    console.log(newProfile);
    return {
      data: newProfile,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.error("Profile creation error:", error);
    return {
      data: null,
      error: "Error creating profile",
      status: 500,
    };
  }
}

export async function updateDoctorProfile(
  id: string | undefined,
  data: BioDataFormProps
) {
  if (id) {
    try {
      const updatedDoctorProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorProfile);
      return {
        data: updatedDoctorProfile,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}
export async function updateDoctorProfileById(
  id: string | undefined,
  data: ProfileInfoProps
) {
  if (id) {
    try {
      const updatedDoctorProfile = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorProfile);
      return {
        data: updatedDoctorProfile,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}
export async function updateDoctorContactById(
  id: string | undefined,
  data: ContactInfoProps
) {
  if (id) {
    try {
      const updatedDoctorContact = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorContact);
      return {
        data: updatedDoctorContact,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}

export async function updateDoctorEducationById(
  id: string | undefined,
  data: EducationInfoProps
) {
  if (id) {
    try {
      const updatedDoctorEducation = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorEducation);
      return {
        data: updatedDoctorEducation,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}
export async function updateDoctorPracticeById(
  id: string | undefined,
  data: PracticeInfoProps
) {
  if (id) {
    try {
      const updatedDoctorPractice = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorPractice);
      return {
        data: updatedDoctorPractice,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}

export async function completeDoctorProfile(
  id: string | undefined,
  data: AdditionInfoProps
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (id) {
    try {
      const existingDoctorProfile = await prismaClient.doctorProfile.findUnique(
        {
          where: {
            id,
          },
        }
      );

      if (!existingDoctorProfile) {
        return {
          data: null,
          error: "Profile not found",
          status: 404,
        };
      }

      const firstName = existingDoctorProfile.firstName;
      const email = existingDoctorProfile.email as string;
      const previewText = "Welcome to Medico!";
      const message =
        "Thank you for joining Medico. We are so happy to have you onboard:";
      const sendMail = await resend.emails.send({
        from: "Medico <info@umutsakura.com>",
        to: email,
        subject: "Welcome to Medico👋",
        react: WelcomeEmail({ firstName, previewText, message }),
      });

      const updatedDoctorAddition = await prismaClient.doctorProfile.update({
        where: {
          id,
        },
        data,
      });
      console.log(updatedDoctorAddition);
      return {
        data: updatedDoctorAddition,
        error: null,
        status: 201,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        data: null,
        error: "Error updating profile",
        status: 500,
      };
    }
  }
}
