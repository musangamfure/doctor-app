"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";
import ServiceLists from "./services/ServiceLists";
import LinkCards from "./doctors/LinkCards";

import { ServicesProps } from "../../../types/types";
import { getServices } from "../../../actions/services";
import { Service, Specialty, Symptom } from "@prisma/client";
import SymptomsCard from "../dashboard/SymptomsCard";
import SymptomsLinkCard from "./doctors/SymptomsLinkCard";

type TabsComponentProps = {
  services: Service[];
  specialties: Specialty[];
  symptoms: Symptom[];
};

export default function TabsComponent({
  services,
  specialties,
  symptoms,
}: TabsComponentProps) {
  //

  // const services: ServicesProps[] = [
  //   {
  //     title: "Mental Health",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "ED consultation",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Psychology",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Anxienty",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Pain",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Depression",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Addiction",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Addiction",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  //   {
  //     title: "Addiction",
  //     imageUrl: "/doctor.jpg",
  //     slug: "telehealth",
  //   },
  // ];
  const tabsData = [
    {
      title: "Top Booked",
      icon: Stethoscope,
      content: <ServiceLists data={services} />,
    },
    // {
    //   title: "Doctors",
    //   icon: Microscope,
    //   content: <LinkCards className="bg-green-900" />,
    // },
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
