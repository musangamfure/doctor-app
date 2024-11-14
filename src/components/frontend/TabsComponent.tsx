"use client";

import { Tabs } from "flowbite-react";
import { Activity, Stethoscope, Syringe } from "lucide-react";
import ServiceLists from "./services/ServiceLists";
import LinkCards from "./doctors/LinkCards";
import { Service, Specialty, Symptom } from "@prisma/client";
import SymptomsLinkCard from "./doctors/SymptomsLinkCard";
import { ServicesWithDoctorCount } from "../../../actions/services";

type TabsComponentProps = {
  services: ServicesWithDoctorCount[];
  specialties: Specialty[];
  symptoms: Symptom[];
};

export default function TabsComponent({
  services,
  specialties,
  symptoms,
}: TabsComponentProps) {
  const tabsData = [
    {
      title: "Top Booked",
      icon: Stethoscope,
      content: <ServiceLists data={services} />,
    },

    {
      title: "Specialists",
      icon: Activity,
      content: <LinkCards specialties={specialties} />,
    },
    {
      title: "Symptoms",
      icon: Syringe,
      content: <SymptomsLinkCard symptoms={symptoms} />,
    },
  ];

  return (
    <Tabs
      aria-label="Tabs with underline"
      variant="underline"
      className="dark:bg-slate-950"
    >
      {tabsData.map((tab, i) => {
        return (
          <Tabs.Item active key={i} title={tab.title} icon={tab.icon}>
            {tab.content}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}
