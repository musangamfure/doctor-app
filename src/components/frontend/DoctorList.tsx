import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";
import { Map } from "lucide-react";
import DoctorsListCarousel from "./DoctorsListCarousel";

export default function DoctorList({
  title = "Telehealth Visit",
  isInPersonal = false,
}: {
  title?: string;
  isInPersonal?: boolean;
}) {
  return (
    <div>
      <SectionHeading title={title} />

      <div className="py-4 flex items-center justify-between">
        {isInPersonal ? (
          <Link
            className="py-1 px-2 text-blue-500 text-sm flex items-center gap-1 bg-white/50"
            href="#"
          >
            <Map size={20} className="flex-shrink-0" />
            <span> View Map</span>
          </Link>
        ) : (
          <ToggleButton />
        )}
        <Link
          className="py-3 px-6 border border-blue-600 bg-white/50 rounded-r-sm"
          href="#"
        >
          See all
        </Link>
      </div>
      <div className=" ">
        <DoctorsListCarousel isInPersonal={isInPersonal} />
      </div>
    </div>
  );
}
