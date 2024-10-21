import NewButton from "@/components/dashboard/doctor/NewButton";
import PannelHeader from "@/components/dashboard/doctor/PannelHeader";
import { Anvil } from "lucide-react";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import SpecialtiesCard from "@/components/dashboard/SpecialtiesCard";
import { getSymptoms } from "../../../../../actions/symptoms";
import SymptomsCard from "@/components/dashboard/SymptomsCard";

export default async function NewSymptomPage() {
  const symptoms = (await getSymptoms()) || [];

  return (
    <div>
      <div className="grid md:grid-cols-6">
        <div className="md:col-span-2 py-3 border-r">
          <PannelHeader
            title="Symptoms"
            count={symptoms.data?.length?.toString().padStart(2, "0")}
            icon={Anvil}
          />
          <ScrollArea className="h-[25rem] w-full p-4">
            {symptoms.data?.map((symptom) => (
              <SymptomsCard key={symptom.title} symptom={symptom} />
            ))}
          </ScrollArea>
        </div>
        <div className="md:col-span-4 hidden md:block">
          <div className="py-3 px-6 border-b border-b-gray-200 flex justify-end items-center">
            <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
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
                    {symptoms.data?.length?.toString().padStart(2, "0")}
                  </span>{" "}
                  Symptoms today.
                </p>
                <NewButton
                  title="New Symptom"
                  href="/dashboard/symptoms/new"
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
