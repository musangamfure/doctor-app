"use client";

import { RadioGroupInput } from "@/components/auth/forminputs/RadioGroupInput";
import { SelectInput } from "@/components/auth/forminputs/SelectInput";
import TextFormInput from "@/components/auth/forminputs/TextFormInput";
import { Button } from "@/components/ui/button";
import { Appointment } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateAppointmentbyId } from "../../../../actions/appointments";
import toast from "react-hot-toast";

export type AppointmentUpdateProps = {
  status: string;
  meetingLink: string;
  meetingProvider: string;
};

export default function UpdateAppointmentForm({
  appointment,
}: {
  appointment: Appointment;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentUpdateProps>({
    defaultValues: {
      status: appointment.status,
      meetingLink: appointment.meetingLink,
      meetingProvider: appointment.meetingProvider,
    },
  });

  const statusOptions = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Approve",
      value: "approved",
    },
    {
      label: "Reject",
      value: "rejected",
    },
  ];
  const providersOptions = [
    {
      title: "Zoom",
      value: "zoom",
    },
    {
      title: "Google Meet",
      value: "google",
    },
    {
      title: "Microsoft Teams",
      value: "microsoft",
    },
  ];

  async function handleUpdate(data: AppointmentUpdateProps) {
    setLoading(true);
    console.log(data);
    try {
      await updateAppointmentbyId(appointment.id, data);
      setLoading(false);
      toast.success("Appointment Updated Successfully");
      reset({
        status: appointment.status,
        meetingLink: appointment.meetingLink,
        meetingProvider: appointment.meetingProvider,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="py-4 p-4 border-2 border-green-600 shadow rounded-md m-4"
    >
      <div className="sm:col-span-4">
        <div className=" flex items-center justify-between border-b">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
            Update Appointment
          </h2>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : " Update Appointment"}
          </Button>
        </div>
        <div className="mt-2">
          <div className="grid gap-2 py-4 md:grid-cols-2">
            <RadioGroupInput
              name="status"
              register={register}
              radioOptions={statusOptions}
              title="Approve Appointment"
              className="col-span-full sm:col-span-full"
              errors={errors}
            />
            <SelectInput
              name="meetingProvider"
              label="Choose Meeting Provider"
              register={register}
              className="col-span-full sm:col-span-full"
              options={providersOptions}
            />
          </div>
          <TextFormInput
            name="meetingLink"
            label="Add Meeting Link"
            placeholder="Eg: https://meet.google.com/abcde"
            register={register}
            errors={errors}
            className="col-span-full sm:col-span-1"
          />
        </div>
      </div>
    </form>
  );
}
