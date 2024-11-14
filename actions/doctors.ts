"use server";

import { prismaClient } from "@/lib/db";
import { Doctor, SpecialtyProps } from "../types/types";
import createSlug from "../utils/slugFunction";

type specialityProps = {
  title: string;
  slug: string;
};

export type ServiceDataProps = {
  doctors: Doctor[] | undefined;
  services: specialityProps[];
};
export type SpecialityDataProps = {
  doctors: Doctor[] | undefined;
  specialities: specialityProps[];
};

export async function getDoctorByServiceSlug(slug: string) {
  try {
    let doctors: Doctor[] | undefined = [];
    let services: SpecialtyProps[] | undefined = [];
    if (slug) {
      const service = await prismaClient.service.findUnique({
        where: {
          slug,
        },
        include: {
          doctorProfiles: {
            include: {
              availability: true,
            },
          },
        },
      });
      doctors = service?.doctorProfiles.map((doctor) => {
        return {
          id: doctor.userId,
          name: `${doctor.firstName} ${doctor.lastName}`,
          email: doctor.email ?? "",
          slug: createSlug(`${doctor.firstName} ${doctor.lastName}`),
          phone: doctor.phone ?? "",
          doctorProfile: doctor,
        };
      });

      services = await prismaClient.service.findMany({
        where: {
          id: {
            not: service?.id,
          },
        },
      });
      const data = {
        doctors,
        services,
      };
      return data as ServiceDataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getDoctorBySpecialitySlug(slug: string) {
  try {
    let doctors: Doctor[] | undefined = [];
    let specialities: SpecialtyProps[] | undefined = [];
    if (slug) {
      const speciality = await prismaClient.specialty.findUnique({
        where: {
          slug,
        },
        include: {
          doctorProfiles: {
            include: {
              availability: true,
            },
          },
        },
      });
      doctors = speciality?.doctorProfiles.map((doctor) => {
        return {
          id: doctor.userId,
          name: `${doctor.firstName} ${doctor.lastName}`,
          email: doctor.email ?? "",
          slug: createSlug(`${doctor.firstName} ${doctor.lastName}`),
          phone: doctor.phone ?? "",
          doctorProfile: doctor,
        };
      });

      specialities = await prismaClient.specialty.findMany({
        where: {
          id: {
            not: speciality?.id,
          },
        },
      });
      const data = {
        doctors,
        specialities,
      };
      return data as SpecialityDataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
