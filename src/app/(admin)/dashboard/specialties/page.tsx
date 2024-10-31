import NewButton from "@/components/dashboard/doctor/NewButton";
import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import { Anvil, LayoutGrid } from "lucide-react";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getSpecialties } from "../../../../../actions/specialties";
import SpecialtiesCard from "@/components/dashboard/SpecialtiesCard";

export default async function NewSpecialtyPage() {
  const specialties = (await getSpecialties()) || [];

  return (
    <div>
      <div className="grid md:grid-cols-6">
        <div className="md:col-span-2 py-3 border-r">
          <PannelHeader
            title="Specialties"
            count={specialties.data?.length?.toString().padStart(2, "0")}
            icon={Anvil}
          />
          <ScrollArea className="h-[25rem] w-full p-4">
            {specialties.data?.map((specialty) => (
              <SpecialtiesCard key={specialty.title} specialty={specialty} />
            ))}
          </ScrollArea>
        </div>
        <div className="md:col-span-4 hidden md:block">
          <div className="py-3 px-6 border-b border-b-gray-200 flex justify-end items-center">
            <NewButton
              title="New Specialty"
              href="/dashboard/specialties/new"
            />
          </div>
          <div className="flex items-center h-[80%] justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-[90%]  ">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="pb-3">
                  <Anvil className="w-12 h-12 flex-shrink-0 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  You have{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {specialties.data?.length?.toString().padStart(2, "0")}
                  </span>{" "}
                  Specialties today.
                </p>
                <NewButton
                  title="New Specialty"
                  href="/dashboard/services/new"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}