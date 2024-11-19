"use server";

import { prismaClient } from "@/lib/db";
import { Doctor, SpecialtyProps } from "../types/types";
import createSlug from "../utils/slugFunction";
import { ServicesWithDoctorCount } from "./services";

export type specialityProps = {
  title: string;
  slug: string;
  id?: string;
};

export type ServiceDataProps = {
  doctors: Doctor[] | undefined;
  services: specialityProps[];
};
export type SpecialityDataProps = {
  doctors: Doctor[] | undefined;
  specialities: specialityProps[];
};
export type SympytomsDataProps = {
  doctors: Doctor[] | undefined;
  symptoms: specialityProps[];
};

export interface SearchDataProps {
  doctors: Doctor[] | undefined;
  specialties: specialityProps[];
  symptoms: specialityProps[];
  services: ServicesWithDoctorCount[];
}

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
export async function getDoctorBySymptomsId(symptomId: string) {
  try {
    let doctors: Doctor[] | undefined = [];
    let symptoms: SpecialtyProps[] | undefined = [];

    if (symptomId) {
      const doctorProfiles = await prismaClient.doctorProfile.findMany({
        where: {
          symptomIds: {
            has: symptomId,
          },
        },
        include: {
          availability: true,
        },
      });

      doctors = doctorProfiles.map((doctor) => {
        return {
          id: doctor.userId,
          name: `${doctor.firstName} ${doctor.lastName}`,
          email: doctor.email ?? "",
          slug: createSlug(`${doctor.firstName} ${doctor.lastName}`),
          phone: doctor.phone ?? "",
          doctorProfile: doctor,
        };
      });

      symptoms = await prismaClient.symptom.findMany({
        where: {
          id: {
            not: symptomId,
          },
        },
      });
      const data = {
        doctors,
        symptoms,
      };
      return data as SympytomsDataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDoctorsBySearch(
  query: string
): Promise<SearchDataProps> {
  if (query) {
    try {
      const services = await prismaClient.service.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { slug: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          _count: {
            select: {
              doctorProfiles: true,
            },
          },
        },
      });
      const specialties = await prismaClient.specialty.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { slug: { contains: query, mode: "insensitive" } },
          ],
        },
      });
      const symptoms = await prismaClient.symptom.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { slug: { contains: query, mode: "insensitive" } },
          ],
        },
      });
      const doctorProfiles = await prismaClient.doctorProfile.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          availability: true,
        },
      });

      const doctors = doctorProfiles.map((doctor) => ({
        id: doctor.userId,
        name: `${doctor.firstName} ${doctor.lastName}`,
        email: doctor.email ?? "",
        slug: createSlug(`${doctor.firstName} ${doctor.lastName}`),
        phone: doctor.phone ?? "",
        doctorProfile: doctor,
      }));

      return {
        services,
        specialties,
        symptoms,
        doctors,
      };
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  // Fallback to an empty structure if query is empty or an error occurs
  return {
    doctors: undefined,
    specialties: [],
    symptoms: [],
    services: [],
  };
}
