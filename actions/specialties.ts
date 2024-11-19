"use server";

import { prismaClient } from "@/lib/db";
import { SpecialtyProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createSpecialty(data: SpecialtyProps) {
  try {
    const existingspecialty = await prismaClient.specialty.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingspecialty) {
      return {
        data: null,
        status: 409,
        error: "Specialty already exists",
      };
    }
    const newSpecialty = await prismaClient.specialty.create({
      data,
    });
    revalidatePath("/dashboard/specialties");
    // console.log(newSpecialty);
    return {
      data: newSpecialty,
      error: null,
      status: 201,
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
export async function createManySpecialties() {
  const specialties = [
    {
      title: "Primary care",
      slug: "primary-care",
    },

    {
      title: "OB/GYN",
      slug: "ob-gyn",
    },
    {
      title: "Dermatology",
      slug: "dermatology",
    },
    {
      title: "Pediatrics",
      slug: "pediatrics",
    },
    {
      title: "Dentistry",
      slug: "dentistry",
    },
    {
      title: "Gastroenterology",
      slug: "gastroenterology",
    },
    {
      title: "Urology",
      slug: "urology",
    },
    {
      title: "Radiology",
      slug: "radiology",
    },
    {
      title: "Cardiology",
      slug: "cardiology",
    },
  ];

  for (const specialty of specialties) {
    try {
      await createSpecialty(specialty);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getSpecialties() {
  try {
    const specialties = await prismaClient.specialty.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/dashboard/specialties");
    // console.log(specialties);
    return {
      data: specialties,
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

export async function deleteSpecialty(id: string) {
  try {
    await prismaClient.specialty.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/specialties");

    return {
      ok: true,
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

export async function getSpecialtybySlug(slug: string) {
  try {
    if (slug) {
      const specialty = await prismaClient.specialty.findUnique({
        where: {
          slug,
        },
      });
      return {
        data: specialty,
        error: null,
        status: 200,
      };
    } else {
      return {
        data: null,
        status: 404,
        error: "Service not found",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error: "Something went wrong",
    };
  }
}

export async function updateSpecialty(id: string, data: SpecialtyProps) {
  try {
    const existingSpecialty = await prismaClient.specialty.findUnique({
      where: {
        id,
      },
    });

    if (!existingSpecialty) {
      return {
        data: null,
        status: 409,
        error: "Specialty does not exists",
      };
    }
    const updatedSpecialty = await prismaClient.specialty.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/specialties");
    // console.log(updatedSpecialty);
    return {
      data: updatedSpecialty,
      error: null,
      status: 201,
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
