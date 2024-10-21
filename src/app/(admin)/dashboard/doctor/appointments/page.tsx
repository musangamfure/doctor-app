import ListDisplayCard from "@/components/dashboard/doctor/ListDisplayCard";
import ListPanel from "@/components/dashboard/doctor/ListPanel";
import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import { Calendar } from "lucide-react";
import React from "react";

export default function AppointmentPage() {
  return (
    <div>
      <PannelHeader title="Appointment" icon={Calendar} count="12" />
      <div className="grid grid-cols-5">
        <div className="col-span-2 p-3">
          <ListPanel />
        </div>
        <div className="col-span-3 py-3">
          <ListDisplayCard />
        </div>
      </div>
    </div>
  );
}
