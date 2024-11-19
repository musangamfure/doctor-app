import React from "react";
import TabsComponent from "./TabsComponent";
import { getServices } from "../../../actions/services";
import { getSpecialties } from "../../../actions/specialties";
import { getSymptoms } from "../../../actions/symptoms";

export default async function TabledSection() {
  const services = (await getServices()) || [];
  const specialties = (await getSpecialties()).data || [];
  const symptoms = (await getSymptoms()).data || [];
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-14">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Browse Your Doctors By.
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Choose from thousands of providers at every day affordable
                prices. Book online today.
              </p>
            </div>
          </div>
        </div>
        <TabsComponent
          services={services}
          specialties={specialties}
          symptoms={symptoms}
        />
      </div>
    </section>
  );
}
