import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
import { Map } from "lucide-react";
import DoctorsListCarousel from "./DoctorsListCarousel";
import { Doctor } from "../../../types/types";

export default function DoctorList({
  title = "Telehealth Visit",
  isInPersonal = false,
  doctors,
}: {
  title?: string;
  isInPersonal?: boolean;
  doctors: Doctor[];
}) {
  return (
    <div>
      <SectionHeading title={title} />

      <div className="py-4 flex items-center justify-between">
        {isInPersonal ? (
          <Link
            className="py-2 px-2 text-blue-500 dark:text-white/80 text-sm flex items-center gap-1 bg-white/50 dark:bg-slate-950 dark:border-white/85 border border-blue-600 rounded-sm"
            href="#"
          >
            <Map size={20} className="flex-shrink-0" />
            <span> View Map</span>
          </Link>
        ) : (
          <ToggleButton />
        )}
        <Link
          className="py-3 px-6 border border-blue-600 dark:border-white/85 bg-white/50 dark:bg-slate-950 rounded-r-sm"
          href={`/category?mode=${title}`}
        >
          See all
        </Link>
      </div>
      <div className=" ">
        <DoctorsListCarousel doctors={doctors} isInPersonal={isInPersonal} />
      </div>
    </div>
  );
}
