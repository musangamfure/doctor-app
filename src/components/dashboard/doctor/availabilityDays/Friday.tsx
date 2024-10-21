import React, { useState } from "react";
import {
  createAvailability,
  updateAvailabilityById,
} from "../../../../../actions/onboarding";
import toast from "react-hot-toast";
import TimesComponent from "./TimesComponent";
import { timesArray } from "../../../../../config/constants";

export default function Friday({
  profile,
  day,
}: {
  profile: any;
  day: string;
}) {
  const availability = profile?.availability || {};
  const initialData = availability[day] || [];

  const [selected, setSelected] = useState<string[]>(initialData);

  const [loading, setLoading] = useState(false);

  function handleAddTime(time: string) {
    if (!selected.includes(time)) {
      setSelected((prev: string[]) => [...prev, time]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== time));
    }
  }

  function handleAddAllTime() {
    setSelected([...timesArray]);
  }

  function handleRemoveTime(time: string) {
    setSelected((prev) => prev.filter((item) => item !== time));
  }
  function handleRemoveAllTime() {
    setSelected([]);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      if (profile?.id && availability?.id) {
        const data = {
          friday: selected,
          doctorProfileId: profile.id,
        };

        await updateAvailabilityById(availability?.id, data);
        setLoading(false);
        toast.success("Availability updated successfully.");
      } else if (profile?.id) {
        const data = {
          friday: selected,
          doctorProfileId: profile.id,
        };

        await createAvailability(data);
        setLoading(false);
        toast.success("Availability created successfully.");
      } else {
        toast.error("No profile ID provided.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error updating availability");
    }
  }

  return (
    <TimesComponent
      handleAddAllTime={handleAddAllTime}
      handleAddTime={handleAddTime}
      handleRemoveTime={handleRemoveTime}
      handleSubmit={handleSubmit}
      selected={selected}
      timesArray={timesArray}
      loading={loading}
      handleRemoveAllTime={handleRemoveAllTime}
      day={day}
    />
  );
}
