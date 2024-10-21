"use server";

import { prismaClient } from "@/lib/db";
import { SymptomsProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createSymptom(data: SymptomsProps) {
  try {
    const existingsymptom = await prismaClient.symptom.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingsymptom) {
      return {
        data: null,
        status: 409,
        error: "Symptom already exists",
      };
    }
    const newSymptom = await prismaClient.symptom.create({
      data,
    });
    revalidatePath("/dashboard/symptoms");
    console.log(newSymptom);
    return {
      data: newSymptom,
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
export async function createManySymptoms() {
  const symptoms = [
    {
      title: "Anxiety",
      slug: "anxiety",
    },

    {
      title: "Depression",
      slug: "depression",
    },
    {
      title: "Asthma",
      slug: "asthma",
    },
    {
      title: "Erectile Dysfunction",
      slug: "erectile-dysfunction",
    },
    {
      title: "Back pain",
      slug: "back-pain",
    },
    {
      title: "UTI",
      slug: "uti",
    },
    {
      title: " Flu, cough, or cold",
      slug: "flu-cough-or-cold",
    },
    {
      title: "Acne",
      slug: "acne",
    },
    {
      title: "Tooth pain",
      slug: "tooth-pain",
    },
    {
      title: "Vaginal itching",
      slug: "vaginal-itching",
    },
    {
      title: "Itchy skin",
      slug: "itchy-skin",
    },
    {
      title: "Ear infection",
      slug: "ear-infection",
    },
    {
      title: "Sore throat",
      slug: "sore-throat",
    },
    {
      title: "Rash",
      slug: "rash",
    },
    {
      title: "Migraine",
      slug: "migraine",
    },
    {
      title: " Diarrhea",
      slug: "diarrhea",
    },
    {
      title: "Eczema",
      slug: "eczema",
    },
    {
      title: "Dizziness",
      slug: "dizziness",
    },
    {
      title: "Fever",
      slug: "fever",
    },
    {
      title: "Vomiting",
      slug: "vomiting",
    },
  ];

  for (const symptom of symptoms) {
    try {
      await createSymptom(symptom);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getSymptoms() {
  try {
    const symptoms = await prismaClient.symptom.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/dashboard/symptoms");
    console.log(symptoms);
    return {
      data: symptoms,
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

export async function deleteSymptom(id: string) {
  try {
    await prismaClient.symptom.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/symptoms");

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

export async function getSymptombySlug(slug: string) {
  try {
    if (slug) {
      const symptom = await prismaClient.symptom.findUnique({
        where: {
          slug,
        },
      });
      return {
        data: symptom,
        error: null,
        status: 200,
      };
    } else {
      return {
        data: null,
        status: 404,
        error: "Symptom not found",
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

export async function updateSymptom(id: string, data: SymptomsProps) {
  try {
    const existingSymptom = await prismaClient.symptom.findUnique({
      where: {
        id,
      },
    });

    if (!existingSymptom) {
      return {
        data: null,
        status: 409,
        error: "Symptom does not exists",
      };
    }
    const updatedSymptom = await prismaClient.symptom.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/symptoms");
    console.log(updatedSymptom);
    return {
      data: updatedSymptom,
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
