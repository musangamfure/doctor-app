"use server";

import { prismaClient } from "@/lib/db";
import { appointmentsProps } from "../types/types";
import { revalidatePath } from "next/cache";
import { AppointmentUpdateProps } from "@/components/dashboard/doctor/UpdateAppointmentForm";
import { Resend } from "resend";
import NewAppointmentTemplate from "@/components/emails/NewAppointmentTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(data: appointmentsProps) {
  try {
    const doctor = await prismaClient.user.findUnique({
      where: {
        id: data.doctorId,
      },
    });
    const newAppointment = await prismaClient.appointment.create({
      data,
    });

    const firstName = doctor?.name;
    const doctorEmail = doctor?.email;
    const link = `${baseUrl}/dashboard/doctor/appointments/view/${newAppointment.id}`;
    const message =
      "You have a new appoinmtment scheduled. Please review and approve it by clicking the link below :";
    const sendMail = await resend.emails.send({
      from: "Medical App <info@umutsakura.com>",
      to: doctorEmail ?? "",
      subject: "New Appointment Approval needed",
      react: NewAppointmentTemplate({ firstName, link, message }),
    });
    // console.log(sendMail);
    revalidatePath("/dashboard/doctor/appointments");
    // console.log(newAppointment);

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

export async function updateAppointment(id: string, data: appointmentsProps) {
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

    revalidatePath("/dashboard/dortor/appointments");
    // console.log(updatedAppointment);

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

export async function updateAppointmentbyId(
  id: string,
  data: AppointmentUpdateProps
) {
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

    const patientId = updatedAppointment.patientId;
    const patient = await prismaClient.user.findUnique({
      where: {
        id: patientId,
      },
    });

    const firstName = patient?.name;
    const patientEmail = patient?.email;
    const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
    const message =
      "Your appointment have been approved. You can view the details here :";
    const sendMail = await resend.emails.send({
      from: "Medical App <info@umutsakura.com>",
      to: patientEmail ?? "",
      subject: "Appointment Approved",
      react: NewAppointmentTemplate({ firstName, link, message }),
    });

    revalidatePath("/dashboard/user/appointments");
    // console.log(updatedAppointment);
    // console.log(sendMail);
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
    // console.log(appointments);
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

export async function getPatientAppointments(patientId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        patientId,
      },
    });
    revalidatePath("/dashboard/doctor/appointments");
    // console.log(appointments);
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

export async function getAppointmentByPatientId(patientId: string | undefined) {
  if (patientId) {
    try {
      const appointment = await prismaClient.appointment.findFirst({
        where: {
          patientId,
        },
      });
      if (!appointment) {
        return null;
      }
      revalidatePath("/dashboard/doctor/appointments");
      // console.log(appointment);
      return appointment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
export async function getDoctorAppointments(doctorId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        doctorId,
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

export async function getAppointmentbyId(id: string) {
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
