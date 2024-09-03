"use client";

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";
import ServiceLists from "./services/ServiceLists";
import LinkCards from "./doctors/LinkCards";

import { ServicesProps } from "../../../types/types";

export default function TabsComponent() {
  const services: ServicesProps[] = [
    {
      title: "Mental Health",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "ED consultation",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Psychology",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Anxienty",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Pain",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Depression",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Addiction",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Addiction",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Addiction",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
  ];
  const tabsData = [
    {
      title: "Top Booked",
      icon: () => <Stethoscope className="mr-2" />,
      content: <ServiceLists data={services} />,
    },
    {
      title: "Doctors",
      icon: () => <Microscope className="mr-2" />,
      content: <LinkCards className="bg-green-900" />,
    },
    {
      title: "Specialists",
      icon: () => <Activity className="mr-2" />,
      content: <LinkCards className="bg-blue-700" />,
    },
    {
      title: "Symptoms",
      icon: () => <Syringe className="mr-2" />,
      content: <LinkCards className="bg-red-900" />,
    },
  ];

  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
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
