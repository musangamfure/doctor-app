import ListPanel from "@/components/dashboard/doctor/ListPanel";
import NewButton from "@/components/dashboard/doctor/NewButton";
import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import { Calendar } from "lucide-react";
import React from "react";

export default function AppointmentDetailPage() {
  return (
    <div>
      <div className="grid grid-cols-6">
        <div className="col-span-2 py-3 border-r">
          <PannelHeader title="Appointments" count="11" icon={Calendar} />
          <ListPanel />
        </div>
        <div className="col-span-4">
          <div className="py-3 px-6 border-b border-b-gray-200 flex justify-end items-center">
            <NewButton
              title="New Appointment"
              href="/dashboard/doctor/appointments/new"
            />
          </div>
          <div className="w-full h-full flex justify-center items-center">
            Patient Detail Page
          </div>
        </div>
      </div>
    </div>
  );
}
