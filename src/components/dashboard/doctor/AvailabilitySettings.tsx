"use client";

import React from "react";

import { Tabs } from "flowbite-react";
import Monday from "./availabilityDays/Monday";
import { DoctorProfile } from "@prisma/client";
import Tuesday from "./availabilityDays/Tuesday";
import Wednesday from "./availabilityDays/Wednesday";
import Thursday from "./availabilityDays/Thursday";
import Friday from "./availabilityDays/Friday";
import Saturday from "./availabilityDays/Saturday";
import Sunday from "./availabilityDays/Sunday";

export default function AvailabilitySettings({
  profile,
}: {
  profile: DoctorProfile | undefined | null;
}) {
  console.log(profile);
  const tabs = [
    {
      title: "Monday",
      component: <Monday day="monday" profile={profile} />,
    },
    {
      title: "Tuesday",
      component: <Tuesday day="tuesday" profile={profile} />,
    },
    {
      title: "Wednesday",
      component: <Wednesday day="wednesday" profile={profile} />,
    },
    {
      title: "Thursday",
      component: <Thursday day="thursday" profile={profile} />,
    },
    {
      title: "Friday",
      component: <Friday day="friday" profile={profile} />,
    },
    {
      title: "Saturday",
      component: <Saturday day="saturday" profile={profile} />,
    },
    {
      title: "Sunday",
      component: <Sunday day="sunday" profile={profile} />,
    },
  ];
  return (
    <Tabs aria-label="Tabs with icons" variant="underline">
      {tabs.map((tab, i) => {
        return (
          <Tabs.Item active title={tab.title} key={i}>
            {tab.component}
          </Tabs.Item>
        );
      })}
    </Tabs>
  );
}
