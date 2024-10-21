"use server";

import { prismaClient } from "@/lib/db";
import { ServicesProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createService(data: ServicesProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingService) {
      return {
        data: null,
        status: 409,
        error: "Service already exists",
      };
    }
    const newService = await prismaClient.service.create({
      data,
    });
    revalidatePath("/dashboard/services");
    console.log(newService);
    return {
      data: newService,
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
export async function updateService(id: string, data: ServicesProps) {
  try {
    const existingService = await prismaClient.service.findUnique({
      where: {
        id,
      },
    });

    if (!existingService) {
      return {
        data: null,
        status: 409,
        error: "Service does not exists",
      };
    }
    const updatedService = await prismaClient.service.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/services");
    console.log(updatedService);
    return {
      data: updatedService,
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
export async function createManyService() {
  const services = [
    {
      title: "Telehealth",
      slug: "telehealth",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgM5x0iisfOREB4jTJAxp9ze1o0kSMGsyfalFQn",
    },

    {
      title: "Weight loss",
      slug: "weight-loss",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMSFhgjwiz1p2AvUGMXTzPBoIrb7fh5tZHcJaY",
    },
    {
      title: "Video prescription refill",
      slug: "video-prescription-refill",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMCR81nhOcTU05O7EsZpqk3fjhoReFPISQvWXx",
    },
    {
      title: "UTI consult",
      slug: "uti-consult",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMUNSI0drgQverfCdX81OSy0YkotshJFTR6Gji",
    },
    {
      title: "ED consult",
      slug: "ed-consult",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMYuZ1S573DqpfihXFQ0kCgUoRMG8T45EBjWZc",
    },
    {
      title: " Mental health consult",
      slug: "mental-health-consult",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMsHOAXiJKXBh9JcQIoM5WklOg1qdav23fFr06",
    },
    {
      title: "Urgent care visit",
      slug: "urgent-care-visit",
      imageUrl:
        "https://utfs.io/f/QfiCp4npyqgMe4hF0BHTMIY5uyDJtHpU9A0b6gXxm2iBLPfE",
    },
  ];

  for (const service of services) {
    try {
      await createService(service);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getServices() {
  try {
    const services = await prismaClient.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/dashboard/services");
    console.log(services);
    return {
      data: services,
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

export async function getServicebySlug(slug: string) {
  try {
    if (slug) {
      const service = await prismaClient.service.findUnique({
        where: {
          slug,
        },
      });
      return {
        data: service,
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

export async function deleteService(id: string) {
  try {
    await prismaClient.service.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/services");

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

export async function updateDoctorProfileServiceSettings(
  id: string | undefined,
  data: any
) {
  if (id) {
    try {
      const updatedDoctorProfile = await prismaClient.doctorProfile.update({
        where: { id },
        data,
      });

      console.log(updatedDoctorProfile);
      revalidatePath("/dashboard/doctor/settings");

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
