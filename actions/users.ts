"use server";

import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "../types/types";
import bcrypt from "bcryptjs";

import { Resend } from "resend";
import EmailTemplate from "@/components/emails/EmailTemplate";

export async function createUser(formData: RegisterInputProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, fullName, role, phone, password, plan } = formData;
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return {
        data: null,
        error: `User with this email ( ${email})  already exists in the Database`,
        status: 409,
      };
    }

    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      data: {
        name: fullName,
        email,
        phone,
        role,
        password: hashedPassword,
        token: userToken,
        plan,
      },
    });
    //Send an Email with the Token on the link as a search param
    const token = newUser.token;
    const userId = newUser.id;
    const firstName = newUser.name.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Gecko. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "Medical App <info@umutsakura.com>",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({ firstName, token, linkText, message }),
    });

    console.log(token);
    console.log(sendMail);
    console.log(newUser);
    return {
      data: newUser,
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      error: "Error creating user",
    };
  }
}

export async function getUserById(id: string) {
  if (id) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      return {
        error: "Error getting user",
      };
    }
  }
}

export async function updateUserById(id: string) {
  if (id) {
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          isVerfied: true,
        },
      });
      return updatedUser;
    } catch (error) {
      return {
        error: "Error updating user",
      };
    }
  }
}

export async function getTrackingNumberById(trackingNumber: string) {
  if (trackingNumber) {
    try {
      const existingdoctorProfile = await prismaClient.doctorProfile.findUnique(
        {
          where: {
            trackingNumber,
          },
        }
      );
      if (!existingdoctorProfile) {
        return {
          data: null,
          error:
            "Doctor with this tracking number ( " +
            trackingNumber +
            " ) does not exist in the Database",
          status: 404,
        };
      }

      return {
        data: existingdoctorProfile,
        error: null,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Something went wrong",
      };
    }
  }
}
