"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { appointmentsProps, Doctor } from "../../types/types";
import { Button } from "./ui/button";
import { getDayFromDate } from "../../utils/getDayFromDate";
import { getLongDate } from "../../utils/getLongDate";
import { RainbowButton } from "./ui/rainbow-button";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import App from "next/app";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextFormInput from "./auth/forminputs/TextFormInput";
import DatePickerInput from "./auth/forminputs/DatPickerInput";
import { RadioGroupInput } from "./auth/forminputs/RadioGroupInput";
import TextAreaInput from "./auth/forminputs/TextAreaInput";
import MultipleFileInput, { File } from "./auth/forminputs/MultipleFileInput";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { createAppointment } from "../../actions/appointments";
import { se } from "date-fns/locale";

export default function Availability({ doctor }: { doctor: Doctor }) {
  const { data: session } = useSession();
  const patient = session?.user;

  const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date());
  const [steps, setSteps] = useState<number>(1);
  const day = getDayFromDate(bookDate?.toString() ?? "");
  const longDate = getLongDate(bookDate?.toString() ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState<Date>();
  const [medicalDocs, setMedicalDocs] = useState<File[]>([]);

  const timeStamps = doctor.doctorProfile?.availability?.[day];
  const router = useRouter();

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<appointmentsProps>({
    defaultValues: {
      email: patient?.email ?? "",
    },
  });

  async function onSubmit(data: appointmentsProps) {
    setIsLoading(true);
    if (dob) {
      data.dob = dob;
    }
    data.appointmentFormattedDate = longDate ?? "";
    data.appointmentDate = bookDate ?? new Date();
    data.appointmentTime = selectedTime ?? "";
    data.doctorId = doctor.id;
    data.patientId = patient?.id;
    data.charge = doctor.doctorProfile?.hourlWage ?? 0;
    data.doctorProfileId = doctor.doctorProfile?.id ?? "";
    data.medicalDocuments = medicalDocs.map((doc) => doc.url);
    console.log(data);

    try {
      const res = await createAppointment(data);

      const appointment = res.data;
      console.log(appointment);
      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Appointment created successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  function initiateAppointment() {
    if (patient?.id) {
      if (!selectedTime) {
        toast.error("Please select a time slot");
        return;
      }
      setSteps((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      {steps === 1 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="sm:col-span-1 col-span-full">
              <h2 className="font-bold py-4 uppercase text-xl tracking-wider">
                Select a Date
              </h2>
              <Calendar
                mode="single"
                selected={bookDate}
                onSelect={setBookDate}
                className="rounded-md border"
              />
            </div>
            <div className="sm:col-span-1 col-span-full pt-5 px-3">
              <span className="text-sm text-blue-400">You have selected</span>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {longDate}
              </h2>

              <div className="w-full">
                {timeStamps && timeStamps.length > 0 && (
                  <div className="w-full mt-3 grid  grid-cols-2 md:grid-cols-3 gap-2">
                    {timeStamps.map((time, index) => (
                      <Button
                        variant={"outline"}
                        onClick={() => setSelectedTime(time)}
                        key={index}
                        className={
                          selectedTime === time
                            ? "bg-purple-600 text-white rounded-md text-center uppercase px-3 py-1"
                            : "bg-white text-slate-950 rounded-md border border-slate-200 text-center uppercase px-3 py-1"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="py-4 ">
                  <RainbowButton
                    onClick={initiateAppointment}
                    className="hover:icon-move"
                  >
                    Book Now (${doctor.doctorProfile?.hourlWage})
                    <span className="icon-wrapper">
                      <MoveRight className="inline-block ml-2 w-8 h-6 transition-transform duration-300" />
                    </span>
                  </RainbowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-4 dark:bg-black dark:rounded-md dark:border dark:border-white/50"
          >
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Tell us more about yourself
            </h2>

            {steps === 2 ? (
              <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-4">
                  <TextFormInput
                    name="firstName"
                    label="First Name"
                    register={register}
                    errors={errors}
                    placeholder="Enter your first name"
                    className="col-span-full sm:col-span-1"
                  />
                  <TextFormInput
                    name="lastName"
                    label="Last Name"
                    register={register}
                    errors={errors}
                    placeholder="Enter your last name"
                    className="col-span-full sm:col-span-1"
                  />
                  <TextFormInput
                    name="phone"
                    label="Phone Number"
                    register={register}
                    errors={errors}
                    placeholder="Enter your phone number"
                    className="col-span-full sm:col-span-1"
                  />
                  <TextFormInput
                    name="email"
                    label="Email Address"
                    register={register}
                    errors={errors}
                    placeholder="Enter your email address"
                    className="col-span-full sm:col-span-1"
                  />
                </div>
                <div className=" mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 space-y-4">
                  <DatePickerInput
                    className="col-span-full pt-[21px] sm:col-span-1"
                    date={dob}
                    setDate={setDob}
                    title="Date of Birth"
                  />
                  <RadioGroupInput
                    errors={errors}
                    title="Gender"
                    radioOptions={genderOptions}
                    className="col-span-full sm:col-span-1"
                    name="gender"
                    register={register}
                  />
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setSteps((curr) => curr - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setSteps((curr) => curr + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-4">
                  <TextFormInput
                    name="location"
                    label="Your Location"
                    register={register}
                    errors={errors}
                    placeholder="Enter your location"
                    className="col-span-full sm:col-span-1"
                  />
                  <TextFormInput
                    name="occupation"
                    label="Occupation"
                    register={register}
                    errors={errors}
                    placeholder="Enter your occupation"
                    className="col-span-full sm:col-span-1"
                  />

                  <TextAreaInput
                    name="appointmentReason"
                    label="Reason for Seeing Doctor"
                    register={register}
                    errors={errors}
                    placeholder="Enter your reason for seeing doctor"
                    className=" sm:col-span-full"
                  />

                  <MultipleFileInput
                    label="Upload your Medical Documents (/Max 4 Docs)"
                    files={medicalDocs}
                    setFiles={setMedicalDocs}
                    endpoint="patientMedicalDocs"
                  />
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setSteps((curr) => curr - 1)}
                  >
                    Previous
                  </Button>
                  {isLoading ? (
                    <Button type="submit" disabled>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submiting...
                    </Button>
                  ) : (
                    <Button type="submit">Submit Appointment</Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
