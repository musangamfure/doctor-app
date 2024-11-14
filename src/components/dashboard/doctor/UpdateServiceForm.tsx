"use client";

import React, { useState } from "react";

import { Loader, Map, Video } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoctorProfile, Service, Specialty, Symptom } from "@prisma/client";

import toast from "react-hot-toast";
import {
  ServicesWithDoctorCount,
  updateDoctorProfileServiceSettings,
} from "../../../../actions/services";
import Image from "next/image";
import { cn } from "@/lib/utils";
export type servicesProps = {
  label: string;
  value: string;
};

export default function UpdateServiceForm({
  services,
  specialties,
  symptoms,
  profile,
}: {
  services: ServicesWithDoctorCount[] | null;
  specialties: Specialty[] | null;
  symptoms: Symptom[] | null;
  profile: DoctorProfile | undefined | null;
}) {
  const profileId = profile?.id;

  console.log(profile);

  const [selectedServiceId, setSelectedServiceId] = useState(
    profile?.serviceId
  );
  const [specialtyId, setSpecialtyId] = useState(profile?.specialtyId);
  const [symptomIds, setSymptomIds] = useState<string[]>(
    profile?.symptomIds || []
  );
  const [savingServices, setSavingServices] = useState(false);
  const [savingSpecialties, setSavingSpecialties] = useState(false);
  const [savingSymptoms, setSavingSymptoms] = useState(false);
  const [savingPrice, setSavingPrice] = useState(false);
  const [savingOperation, setSavingOperation] = useState(false);
  const [operationMode, setOperationMode] = useState(profile?.operationMode);
  const [price, setPrice] = useState(profile?.hourlWage);

  const operationModes = [
    {
      title: "Telehealth",
      slug: "telehealth",
      icon: Video,
    },
    {
      title: "In-person doctor Visit",
      slug: "in-person-doctor-visit",
      icon: Map,
    },
  ];

  async function handleUpdateServices() {
    setSavingServices(true);
    const data = {
      serviceId: selectedServiceId,
    };

    try {
      await updateDoctorProfileServiceSettings(profileId, data);
      setSavingServices(false);
      toast.success("Service updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      setSavingServices(false);
      console.error("Service update error:", error);
    }
    console.log(data);
  }

  async function handleUpdateSpecialty() {
    setSavingSpecialties(true);
    const data = {
      specialtyId,
    };

    try {
      await updateDoctorProfileServiceSettings(profileId, data);
      setSavingSpecialties(false);
      toast.success("Specialty updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      setSavingSpecialties(false);
      console.error("Specialty update error:", error);
    }
    console.log(data);
  }
  async function handleUpdatePrice() {
    setSavingPrice(true);
    const data = {
      hourlWage: price,
    };

    try {
      await updateDoctorProfileServiceSettings(profileId, data);
      setSavingPrice(false);
      toast.success("Service updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      setSavingPrice(false);
      console.error("Service update error:", error);
    }
    console.log(data);
  }

  async function handleUpdateSymptom() {
    setSavingSymptoms(true);
    const data = {
      symptomIds,
    };

    try {
      await updateDoctorProfileServiceSettings(profileId, data);
      setSavingSymptoms(false);
      toast.success("Symptoms updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      setSavingSymptoms(false);
      console.error("Symptoms update error:", error);
    }
    console.log(data);
  }

  async function handleUpdateOperationMode() {
    setSavingOperation(true);
    const data = {
      operationMode,
    };

    try {
      await updateDoctorProfileServiceSettings(profileId, data);
      setSavingOperation(false);
      toast.success("Mode updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      setSavingOperation(false);
      console.error("Mode update error:", error);
    }
    console.log(data);
  }
  return (
    <>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin h-4 w-4 mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        <CardContent className="space-y-2">
          <div className="py-4 p-4 border shadow rounded-md mt-4">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
              Update Hour Price
            </h2>

            <div className=" flex items-center justify-between md:col-span-4">
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="100"
                />
              </div>

              <Button
                disabled={savingPrice}
                onClick={handleUpdatePrice}
                type="button"
              >
                {savingPrice ? "Saving..." : " Update Price"}
              </Button>
            </div>
          </div>

          <div className="border shadow rounded-md p-4 mt-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
                Choose Your Operation Mode
              </h2>
              <Button
                disabled={savingOperation}
                onClick={handleUpdateOperationMode}
                type="button"
              >
                {savingOperation ? "Saving..." : "Update opation mode"}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2 py-4">
              {operationModes &&
                operationModes.map((mode, i) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      type="button"
                      onClick={() => setOperationMode(mode.title)}
                      key={i}
                      className={cn(
                        "border flex items-center justify-center gap-1 flex-col py-2 px-3 rounded-md cursor-pointer",
                        operationMode === mode.title
                          ? "border-2 border-green-500 bg-slate-200"
                          : ""
                      )}
                    >
                      <Icon className="h-8 w-8" />
                      <p className="text-xs">{mode.title}</p>
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="border shadow rounded-md p-4 mt-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
                Choose Services You will offer
              </h2>
              <Button
                disabled={savingServices}
                onClick={handleUpdateServices}
                type="button"
              >
                {savingServices ? "Saving..." : "Update Services"}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2 py-4">
              {services &&
                services.map((service, i) => {
                  return (
                    <button
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      key={i}
                      className={cn(
                        "border flex items-center justify-center gap-1 flex-col py-2 px-3 rounded-md cursor-pointer",
                        selectedServiceId === service.id
                          ? "border-2 border-green-500 bg-slate-200"
                          : ""
                      )}
                    >
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={100}
                        height={100}
                        className="h-14 w-14"
                      />
                      <p className="text-xs">{service.title}</p>
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="border shadow rounded-md p-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
                Choose Services You will offer
              </h2>
              <Button
                disabled={savingSpecialties}
                onClick={handleUpdateSpecialty}
                type="button"
              >
                {savingSpecialties ? "Saving..." : " Update Specialty"}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2 py-4">
              {specialties &&
                specialties.map((specialty, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => setSpecialtyId(specialty.id)}
                      className={cn(
                        "border flex items-center justify-center gap-1 flex-col py-2 px-3 rounded-md cursor-pointer",
                        specialtyId === specialty.id
                          ? "border-2 border-green-500 bg-slate-200"
                          : ""
                      )}
                    >
                      <p className="text-xs">{specialty.title}</p>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="border shadow rounded-md p-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-2">
                Choose Symptoms You will offer
              </h2>
              <Button
                disabled={savingSymptoms}
                onClick={handleUpdateSymptom}
                type="button"
              >
                {savingSymptoms ? "Saving..." : "Update Symptoms"}
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2 py-4">
              {symptoms &&
                symptoms.map((symptom, i) => {
                  const isSelected = symptomIds.includes(symptom.id);

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (isSelected) {
                          setSymptomIds(
                            symptomIds.filter((id) => id !== symptom.id)
                          );
                        } else {
                          setSymptomIds([...symptomIds, symptom.id]);
                        }
                      }}
                      className={cn(
                        "border flex items-center justify-center gap-1 flex-col py-2 px-3 rounded-md cursor-pointer",
                        isSelected
                          ? "border-2 border-green-500 bg-slate-200"
                          : ""
                      )}
                    >
                      <p className="text-xs">{symptom.title}</p>
                    </button>
                  );
                })}
            </div>
          </div>
        </CardContent>
      )}
    </>
  );
}
