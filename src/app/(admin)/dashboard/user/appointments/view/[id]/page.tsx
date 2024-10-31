import { Calendar, Mail, Phone, Video } from "lucide-react";
import React from "react";
import { getAppointmentbyId } from "../../../../../../../../actions/appointments";
import { getLongDate } from "../../../../../../../../utils/getLongDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AppointmentDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointmentData = await getAppointmentbyId(id);
  const appointment = appointmentData.data;

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
            <span> {appointment.firstName}</span>{" "}
            <span> {appointment.lastName}</span>
          </h2>
          <div className="pt-1 text-gray-500">
            <p>
              Gender:
              <span className="capitalize font-semibold ml-2">
                {appointment.gender}
              </span>
            </p>
            <p>
              Phone:
              <span className="ml-2 font-semibold">{appointment.phone}</span>
            </p>
          </div>
        </div>
        <div className=" flex flex-col gap-1">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
            {appointment.appointmentFormattedDate}
          </h3>
          <div className="flex text-blue-500 text-lg font-semibold gap-1 items-center">
            <Calendar className="w-4 h-4 flex-shrink-0 text-gray-500" />
            {appointment.appointmentTime}
          </div>
        </div>
      </div>

      {appointment.status === "approved" ? (
        <div className="py-4 p-4 border-2 border-green-600 shadow rounded-md m-4">
          <div className=" flex items-center justify-between border-b">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
              Appointment Approved
            </h2>
            <Button>
              {`${appointment.appointmentFormattedDate} ${" "} at ${" "} ${
                appointment.appointmentTime
              } `}
            </Button>
          </div>
          <div className="py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{appointment?.meetingProvider}</h2>
              <Button asChild variant="outline">
                <Link target="_blank" href={appointment.meetingLink}>
                  <Video className="w-4 h-4 flex-shrink-0 text-gray-500 mr-2" />
                  <span>Join Meeting</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between py-4">
              <h2 className="font-semibold">Communicate</h2>
              <div className="flex items-center gap-2">
                {" "}
                <Button asChild variant="outline">
                  <Link target="_blank" href={appointment.meetingLink}>
                    <Mail className="w-4 h-4 flex-shrink-0 text-gray-500 mr-2" />
                    <span>Mail Doctor</span>
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link target="_blank" href={appointment.meetingLink}>
                    <Phone className="w-4 h-4 flex-shrink-0 text-gray-500 mr-2" />
                    <span>Call Doctor</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 p-4 border-2 border-green-600 shadow rounded-md m-4">
          <div className=" flex items-center justify-between">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
              Appointment Status
            </h2>
            <Button className="capitalize">{appointment?.status}</Button>
          </div>
        </div>
      )}
      <div className="py-4">
        <div className=" flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Reason</p>
          <p className="px-3">{appointment.appointmentReason}</p>
        </div>
        <div className=" flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Date of Birth</p>
          <p className="px-3">
            {getLongDate(appointment.dob?.toString() ?? "")}
          </p>
        </div>
        <div className=" flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Email</p>
          <p className="px-3">{appointment.email}</p>
        </div>
        <div className=" flex divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Location</p>
          <p className="px-3">{appointment.location}</p>
        </div>
        <div className=" flex items-center divide-x-2 px-4 py-3 divide-gray-200 border-b">
          <p className="px-3 text-sm font-semibold">Medical Docs</p>
          <div className=" px-3 grid grid-cols-4">
            {appointment.medicalDocuments.map((doc, i) => {
              return (
                <Button asChild variant={"outline"} key={i}>
                  <Link target="_blank" href={doc} download>
                    {`Doc-${i + 1}`}{" "}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
