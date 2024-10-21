"use server";

import { prismaClient } from "@/lib/db";
import { appointmentsProps } from "../types/types";
import { revalidatePath } from "next/cache";

export async function createService(data: appointmentsProps) {
  try {
    const newAppointment = await prismaClient.appointment.create({
      data,
    });
    revalidatePath("/dashboard/doctor/appointments");
    console.log(newAppointment);
    return {
      data: newAppointment,
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

export async function updateService(id: string, data: appointmentsProps) {
  try {
    const existingAppointment = await prismaClient.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!existingAppointment) {
      return {
        data: null,
        status: 409,
        error: "Service does not exists",
      };
    }
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/doctor/appointments");
    console.log(updatedAppointment);
    return {
      data: updatedAppointment,
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

export async function getAppointments() {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/dashboard/doctor/appointments");
    console.log(appointments);
    return {
      data: appointments,
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

export async function getServicebyId(id: string) {
  try {
    if (id) {
      const appointment = await prismaClient.appointment.findUnique({
        where: {
          id,
        },
      });
      return {
        data: appointment,
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
    await prismaClient.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/doctor/appointments");

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
